import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";
import { CheckCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSavedSugarLevel,
  setSugarLevel,
} from "./redux/slices/sugarLevelSlice";
import LevelTable from "./components/table/LevelTable";

function App() {
  const [level, setLevel] = useState(6);
  const [level2, setLevel2] = useState(10);
  console.log(level, level2);
  const dispatch = useDispatch();
  const { sugarLevel, savedSugarLevel } = useSelector(
    (state) => state.sugarLevel
  );
  console.log(sugarLevel, savedSugarLevel);
  const handleSave = () => {
    const data = {
      id: Date.now(),
      time: Date.now(),
      level: parseFloat(level + "." + level2),
    };
    dispatch(setSugarLevel(data));
    dispatch(setSavedSugarLevel(data));
  };
  return (
    <main className="flex flex-col gap-10 justify-center items-center min-h-screen">
      <section className="flex items-center gap-3">
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(e.target.value.slice(0, 2))}
          className="w-20 text-6xl font-semibold px-2 py-1 outline-none"
        />
        <>
          <span className="text-4xl">.</span>
          <input
            type="number"
            value={level2}
            onChange={(e) => setLevel2(e.target.value.slice(0, 2))}
            className="w-16 text-4xl font-semibold px-2 py-1 outline-none"
          />
          <span className="text-xl">mmol/L</span>
        </>
        <Button onClick={handleSave} variant="outline" size="icon">
          <CheckCheck />
        </Button>
      </section>
      <section>
        {savedSugarLevel?.length > 0 && (
          <>
            <p className="text-center mb-2 font-mono">Blood Sugar Level</p>
            <LevelTable />
          </>
        )}
      </section>
      {/* Open drawer concept */}
      {/* <Drawer>
        <DrawerTrigger asChild>
          <Button>OPen</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <div>{level}</div>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <div className="text-4xl gap-3 grid grid-cols-5 font-bold tracking-tighter">
                    {Array.from({ length: 10 }).map((p, i) => (
                      <Button
                        key={i}
                        onClick={(i) => console.log(i)}
                        className="col-span-1"
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
              </div>
              <div className="mt-3 h-[120px]">Main</div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer> */}
    </main>
  );
}

export default App;
