import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useError = () => {
  const [malfunction, setMalfunction] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const retriveError = (problem) => {
    setError(problem);
  };

  const turnOnMalfunction = () => {
    setMalfunction(true);
  };
  const turnOffMalfunction = () => {
    setMalfunction(false);
  };

  const alarm = (object) => {
    return alert(`Mamy mały problem. Wrócisz na stronę główną. (${object})`);
  };
  const navigation = () => {
    navigate("/", {
      state: `Wystąpił problem, zostałeś przeniesiony na stronę główną`,
    });
    turnOffMalfunction();
  };

  useEffect(() => {
    if (malfunction) {
      alarm(error);
      navigation();
    }
  }, [malfunction]);

  return { retriveError, turnOnMalfunction };
};

export default useError;
