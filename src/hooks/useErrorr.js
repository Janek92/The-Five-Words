import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useErrorr = () => {
  const [malfunction, setMalfunction] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const retriveError = (problem) => {
    setError(problem);
  };

  const toggleMalfunction = () => {
    setMalfunction((prev) => (prev = !prev));
  };

  const displayAlarm = (errorMessage) => {
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
      displayAlarm(error);
      navigation();
    }
  }, [malfunction]);

  return { setError, turnOnMalfunction };
};

export default useErrorr;
