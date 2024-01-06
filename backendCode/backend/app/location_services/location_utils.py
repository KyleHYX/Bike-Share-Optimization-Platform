from backend.app.location_services.route import Route
from backend.data_collection.db_utils.db_ops import db_ops
import polyline


def get_markers_on_route(route: list):
    marker_cords = []
    with db_ops() as c:
        for station in route:
            q_res = c.execute(
                "SELECT latitude, longitude FROM stations WHERE name = ?",
                (station,)
            )
            marker_cord = q_res.fetchall()
            if marker_cord:
                lat, lng = marker_cord[0]
                marker_cords.append((lat, lng, station, ))
            print(marker_cord)

    parsed_markers = [{"station": marker[2], "pos": {'lat': marker[0], 'lng': marker[1]}} for marker in marker_cords]

    return parsed_markers


def parse_multi_station_route(route: Route):
    # retrieve markers
    parsed_markers = get_markers_on_route(route.path)
    #parsed_markers = [{'lat': marker[0], 'lng': marker[1]} for marker in marker_cords]

    # retrieve polylines
    polylines_cords = []
    with db_ops() as c:
        for i in range(len(route.path) - 1):
            route_ori = route.path[i]
            route_dst = route.path[i + 1]
            q_res = c.execute(
                "SELECT polyline_data FROM polylines WHERE time_station_origin = ? AND time_station_destination = ?",
                (route_ori, route_dst)
            )
            route_polyline = q_res.fetchall()
            decoded_polyline = polyline.decode(route_polyline[0][0])
            polylines_cords.extend(decoded_polyline)

    parsed_lines = [{'lat': line[0], 'lng': line[1]} for line in polylines_cords]
    return {"parsed_lines": parsed_lines, "parsed_markers": parsed_markers, "time_cost": route.time_cost, "spend_cost": route.spend_cost}


def cal_spend(time, free_time=8, rate=0.25):
    cost = 0
    if time <= free_time:
        return cost

    extra_time = time - free_time
    cost += rate * extra_time
    return cost