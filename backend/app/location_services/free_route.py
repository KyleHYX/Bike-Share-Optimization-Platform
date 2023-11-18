import heapq

from backend.app.location_services.location_utils import get_markers_on_route
from backend.data_collection.db_utils.db_ops import db_ops
import polyline


def find_free_route(ori, dst, free_time, graph):
    route = dijkstra(ori, dst, free_time, graph)
    # retrieve markers
    marker_cords = get_markers_on_route(route)
    parsed_markers = [{'lat': marker[0], 'lng': marker[1]} for marker in marker_cords]

    # retrieve polylines
    polylines_cords = []
    with db_ops() as c:
        for i in range(len(route) - 1):
            route_ori = route[i]
            route_dst = route[i + 1]
            q_res = c.execute(
                "SELECT polyline_data FROM polylines WHERE time_station_origin = ? AND time_station_destination = ?",
                (route_ori, route_dst)
            )
            route_polyline = q_res.fetchall()
            decoded_polyline = polyline.decode(route_polyline[0][0])
            polylines_cords.extend(decoded_polyline)

    parsed_lines = [{'lat': line[0], 'lng': line[1]} for line in polylines_cords]
    return {"parsed_lines": parsed_lines, "parsed_markers": parsed_markers}


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
                if weight >= free_time:
                    continue
                time = cur_time + weight
                if time < times[neighbor]:
                    times[neighbor] = time
                    predecessors[neighbor] = cur_station
                    heapq.heappush(queue, (time, neighbor))

    path = []
    while dst is not None:
        path.insert(0, dst)
        dst = predecessors[dst]
    return path
