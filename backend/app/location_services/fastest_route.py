from backend.app.location_services.location_utils import get_markers_on_route
from backend.data_collection.db_utils.db_ops import db_ops
import polyline


def get_fastest_route(src, dst):
    with db_ops() as c:
        q_res = c.execute(
            "SELECT polyline_data FROM polylines WHERE time_station_origin = ? AND time_station_destination = ?",
            (src, dst)
        )
        polyline_data = q_res.fetchall()
        decoded_polyline = polyline.decode(polyline_data[0][0])
        parsed_lines = [{'lat': line[0], 'lng': line[1]} for line in decoded_polyline]

        route = [src, dst]
        marker_cords = get_markers_on_route(route)
        parsed_markers = [{'lat': marker[0], 'lng': marker[1]} for marker in marker_cords]

    return {"parsed_lines": parsed_lines, "parsed_markers": parsed_markers}
