import heapq

from backend.app.location_services.location_utils import parse_multi_station_route
from backend.app.location_services.skyline_routes import construct_route_info


def find_free_route(ori, dst, free_time, sg):
    path = dijkstra(ori, dst, free_time, sg.graph)
    route = construct_route_info(path, sg.graph, sg.spend_graph)
    return parse_multi_station_route(route)


def dijkstra(ori, dst, free_time, graph):
    queue = [(0, ori)]
    times = {station: float('infinity') for station in graph}
    times[ori] = 0
    predecessors = {ori: None}
    visited = set()
    while queue:
        cur_time, cur_station = heapq.heappop(queue)
        visited.add(cur_station)

        if cur_station == dst:
            break

        for neighbor, weight in graph[cur_station].items():
            if neighbor not in visited:
                # skip the station if user cannot arrive within free quota
                if weight > free_time:
                    continue
                # add 1 min bike return & borrow overhead
                time = cur_time + weight + 1
                if time < times[neighbor]:
                    times[neighbor] = time
                    predecessors[neighbor] = cur_station
                    heapq.heappush(queue, (time, neighbor))

    path = []
    while dst is not None:
        path.insert(0, dst)
        dst = predecessors[dst]
    return path
