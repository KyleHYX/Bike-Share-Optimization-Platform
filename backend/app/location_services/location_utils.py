from backend.data_collection.db_utils.db_ops import db_ops


def get_markers_on_route(route: list):
    marker_cords = []
    with db_ops() as c:
        for station in route:
            q_res = c.execute(
                "SELECT latitude, longitude FROM stations WHERE name = ?",
                (station,)
            )
            marker_cord = q_res.fetchall()
            marker_cords.extend(marker_cord)

    return marker_cords
