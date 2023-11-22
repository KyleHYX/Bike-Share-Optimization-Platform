import heapq
import polyline

from backend.app.location_services.location_utils import get_markers_on_route
from backend.data_collection.db_utils.db_ops import db_ops


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
                spend_graph[ori][dst] = self.cal_spend(ori, dst)

        self.spend_graph = spend_graph

    def cal_spend(self, ori, dst, free_time=8, rate=0.25):
        time = self.graph[ori][dst]
        cost = 0
        if time <= free_time:
            return cost

        extra_time = time - free_time
        cost += rate * extra_time
        return cost


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
