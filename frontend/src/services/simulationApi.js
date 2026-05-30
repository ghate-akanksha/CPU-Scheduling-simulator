import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const fetchSimulation =
  async ({

    algorithm,

    processes,

    timeQuantum

  }) => {

    try {

      const response =
        await axios.post(

          `${API}/api/live/simulate`,

          {

            algorithm,

            processes,

            timeQuantum

          }

        );

      return response.data;

    }

    catch (error) {

      console.log(
        "Simulation API Error:",
        error.response?.data ||
        error.message
      );

      throw error;

    }

};