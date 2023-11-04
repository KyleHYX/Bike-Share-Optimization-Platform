from backend.data_collection.db_utils.db_ops import db_ops


def get_fastest_route(src, dst):
    with db_ops() as c:
        q_res = c.execute(
            "SELECT polyline_data FROM polylines WHERE time_station_origin = ? AND time_station_destination = ?",
            (src, dst)
        )
        polyline = q_res.fetchall()
        print(polyline)
        return polyline
