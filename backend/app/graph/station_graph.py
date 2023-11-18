import heapq
import polyline

from backend.app.location_services.location_utils import get_markers_on_route
from backend.data_collection.db_utils.db_ops import db_ops


def construct_graph() -> dict:
    data = None
    with db_ops() as c:
        q_res = c.execute(
            "SELECT origin, destination, duration_value FROM time_stations"
        )
        data = q_res.fetchall()

    graph = {}
    for origin, destination, duration in data:
        if origin not in graph:
            graph[origin] = {}

        graph[origin][destination] = -(duration // -60)

    return graph


class StationGraph:
    def __init__(self):
        self.graph = construct_graph()


if __name__ == "__main__":
    sg = StationGraph()
    # sg.find_free_route("Cypress & Cornwall", "Hornby & Nelson", 8)
    sg.find_free_route("Cardero & Robson", "10th & Cambie", 8)
