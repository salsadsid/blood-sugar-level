import { Eraser } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LevelTable from "./components/table/LevelTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import {
  reset,
  setSavedSugarLevel,
  setSugarLevel,
} from "./redux/slices/sugarLevelSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  patientName: z.string().min(2, {
    message: "Patient name must be at least 2 characters.",
  }),
});
function App() {
  const [level, setLevel] = useState(6);
  const [level2, setLevel2] = useState(10);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "Mr. John",
    },
  });
  // console.log(level, level2);
  // console.log(level, level2);
  const dispatch = useDispatch();
  const { sugarLevel, savedSugarLevel } = useSelector(
    (state) => state.sugarLevel
  );
  // console.log(sugarLevel, savedSugarLevel);
  const handleSave = () => {
    const data = {
      id: Date.now(),
      time: Date.now(),
      level: parseFloat(level + "." + level2),
    };
    dispatch(setSugarLevel(data));
    dispatch(setSavedSugarLevel(data));
  };
  const handleDelete = () => {
    dispatch(reset());
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className="flex flex-col gap-10 justify-center items-center min-h-screen">
      <section className="flex items-center gap-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <FormField
              control={form.control}
              name="patientName"
              className="w-full"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mx-auto">Patient Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="min-w-[320px]"
                      {...field}
                    />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <article className="flex items-center">
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
            </article>
            <Button onClick={handleSave} type="submit">
              Submit
            </Button>
          </form>
        </Form>

        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleSave} variant="outline" size="icon">
                <CheckCheck />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Save Locally</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </section>
      <section>
        {savedSugarLevel?.length > 0 && (
          <>
            <section className="flex justify-center items-center gap-2 mb-3">
              <p className="font-semibold text-xl">Blood Sugar Level</p>{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleDelete}
                      variant="outline"
                      size="icon"
                    >
                      <Eraser />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Clear local storage</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </section>
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
