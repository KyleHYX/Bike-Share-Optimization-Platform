from backend.app.db_utils.db_ops import db_ops


class StationsModel:
    def __init__(self):
        with db_ops() as c:
            q_res = c.execute("SELECT name FROM stations")
            self.stations = q_res.fetchall()

    def get_stations(self):
        return self.stations[0:50]
