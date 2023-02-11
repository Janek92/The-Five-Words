import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useError = () => {
  const [malfunction, setMalfunction] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const displayAlarm = (errorMessage) => {
    return alert(
      `Mamy mały problem. Wrócisz na stronę główną. (${errorMessage})`
    );
  };

  const navigation = () => {
    navigate("/", {
      state: `Wystąpił problem, zostałeś przeniesiony na stronę główną`,
    });
    setMalfunction(false);
  };

  useEffect(() => {
    if (malfunction) {
      displayAlarm(error);
      navigation();
    }
  }, [malfunction]);

  return { setError, setMalfunction };
};

export default useError;
