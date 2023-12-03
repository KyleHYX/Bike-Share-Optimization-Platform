import copy
import sys
import time

from backend.app.graph.station_graph import StationGraph
from backend.app.location_services.location_utils import parse_multi_station_route
from backend.app.location_services.route import Route


def get_skyline_result(ori, dst, sg, preference):
    free_time = 8
    max_step = sg.graph[ori][dst] / free_time + 3
    skyline_results = get_skyline_routes_approx(ori, dst, sg.graph, sg.spend_graph, max_step)

    time_cost_sum = 0
    spend_cost_sum = 0
    for route in skyline_results:
        time_cost_sum += route.time_cost
        spend_cost_sum += route.spend_cost

    weight = spend_cost_sum / time_cost_sum

    opt_route = 0
    min_val = sys.maxsize
    for route in skyline_results:
        cur_val = route.time_cost * weight * preference / 10 + route.spend_cost * (10 - preference) / 10
        if cur_val < min_val:
            opt_route = route
            min_val = cur_val
    return parse_multi_station_route(opt_route)


def get_skyline_routes_approx(ori, dst, graph, spend_graph, max_step):
    start_time = time.time()

    all_paths = enumerate_all_path_approx_dp(ori, dst, graph, max_step)

    end_time = time.time()
    print(f"Method took {end_time - start_time} seconds to run.")

    all_routes = []
    for path in all_paths:
        all_routes.append(construct_route_info(path, graph, spend_graph))

    skyline_routes = []
    for route in all_routes:
        if not any(other_route != route and
                   other_route.time_cost <= route.time_cost and
                   other_route.spend_cost <= route.spend_cost
                   for other_route in all_routes):
            skyline_routes.append(route)

    # for bla in skyline_routes:
    #     print(bla.path)
    return skyline_routes


def enumerate_all_path_approx(ori, dst, graph, max_step):
    paths = []
    recur_find_all_path_approx(ori, dst, graph, [], paths, max_step)

    return paths


def recur_find_all_path_approx(ori, dst, graph, path, paths, max_step):
    if max_step < 0:
        return
    path.append(ori)
    if ori == dst:
        paths.append(copy.deepcopy(path))
        path.pop()
        return

    for next_node in graph[ori]:
        if ((next_node == dst
             or (graph[next_node][dst] < graph[ori][dst]
                 and graph[ori][next_node] < graph[ori][dst]))
                and next_node not in path):
            recur_find_all_path_approx(next_node, dst, graph, path, paths, max_step - 1)
    path.pop()


def enumerate_all_path_approx_dp(ori, dst, graph, max_step):
    memo = {}  # Memoization dictionary
    return recur_find_all_path_approx_dp(ori, dst, graph, [], max_step, memo)


def recur_find_all_path_approx_dp(ori, dst, graph, path, max_step, memo):
    if max_step < 0:
        return []

    memo_key = (ori, max_step)
    if memo_key in memo:
        return [path + p for p in memo[memo_key]]

    path.append(ori)
    if ori == dst:
        return [copy.deepcopy(path)]

    paths = []
    for next_node in graph[ori]:
        if ((next_node == dst or
             (graph[next_node][dst] < graph[ori][dst] and graph[ori][next_node] < graph[ori][dst]))
                and next_node not in path):
            paths.extend(recur_find_all_path_approx_dp(next_node, dst, graph, copy.deepcopy(path), max_step - 1, memo))

    path.pop()

    memo[memo_key] = paths
    return paths


def get_skyline_routes_naive(ori, dst, graph, spend_graph):
    all_paths = enumerate_all_path(ori, dst, graph)
    all_routes = []
    for path in all_paths:
        all_routes.append(construct_route_info(path, graph, spend_graph))

    skyline_routes = []
    for route in all_routes:
        if not any(other_route != route and
                   other_route.time_cost <= route.time_cost and
                   other_route.spend_cost <= route.spend_cost
                   for other_route in all_routes):
            skyline_routes.append(route)

    print(len(skyline_routes))


def construct_route_info(path, graph, spend_graph):
    time_cost_total, spend_cost_total = 0, 0

    for i in range(0, len(path) - 1):
        ori_station = path[i]
        dst_station = path[i + 1]
        time_cost_total += graph[ori_station][dst_station]
        spend_cost_total += spend_graph[ori_station][dst_station]

    return Route(path, time_cost_total, spend_cost_total)


def enumerate_all_path(ori, dst, graph):
    paths = []
    recur_find_all_path(ori, dst, graph, [], paths)

    return paths


def recur_find_all_path(ori, dst, graph, path, paths):
    path.append(ori)
    if ori == dst:
        paths.append(copy.deepcopy(path))
        path.pop()
        return

    for next_node in graph[ori]:
        if next_node not in path:
            recur_find_all_path(next_node, dst, graph, path, paths)
    path.pop()


if __name__ == "__main__":
    sg = StationGraph()
    ori, dst = "Cardero & Robson", "10th & Cambie"
    ori, dst = "Cypress & Cornwall", "Hornby & Nelson"
    free_time = 8
    max_step = sg.graph[ori][dst] / free_time + 3
    get_skyline_routes_approx(ori, dst, sg.graph, sg.spend_graph, max_step)
