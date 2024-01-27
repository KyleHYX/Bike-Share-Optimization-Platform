import heapq
import polyline

from backend.app.db_utils.db_ops import db_ops
from backend.app.location_services.location_utils import cal_spend



class StationGraph:
    def __init__(self):
        self.graph = None
        self.spend_graph = None
        self.construct_time_graph()
        self.construct_spend_graph()

    def construct_spend_graph(self):
        if self.graph:
            self.construct_time_graph()

        spend_graph = {}
        for ori in self.graph:
            spend_graph[ori] = {}
            for dst in self.graph[ori]:
                spend_graph[ori][dst] = cal_spend(self.graph[ori][dst])

        self.spend_graph = spend_graph


    def construct_time_graph(self):
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

        self.graph = graph
