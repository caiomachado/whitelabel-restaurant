import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import { restaurantMockData } from "./mocks";
import { setVenue } from "./store/reducers/venueReducer";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Header, Loader } from "./components";
import { Menu, Login, Contact } from "./pages";

function App() {
  const [isLoadingWhiteLabel, setIsLoadingWhiteLabel] = useState(true);
  const navigate = useNavigate();
  const currentVenue = useAppSelector((state) => state.venue.venue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // This is only here to allow clearing the timeout since we can't rely on the api to respond
    let timeout: number;

    async function getWhiteLabel() {
      await fetch('https://cdn-dev.preoday.com/challenge/venue/9', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json"
        }
      });

      // This timeout is to simulate a loading state while the app loads the whitelabel config
      timeout = setTimeout(() => {
        setIsLoadingWhiteLabel(false);
        document.title = restaurantMockData?.name;
        dispatch(setVenue(restaurantMockData))
        navigate('/menu');
      }, 2000)
    }

    if (!currentVenue) {
      getWhiteLabel();
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [dispatch, navigate, currentVenue])

  if (isLoadingWhiteLabel) {
    return <Loader size={96} />
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-white flex-1 flex items-center justify-center p-4 sm:px-0 sm:pb-9 sm:pt-3 sm:bg-[#EEEEEE]">
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
