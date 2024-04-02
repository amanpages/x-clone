export default function About() {
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div
          className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                        border-b border-slate-400 text-lg font-semibold dark:bg-slate-500 dark:text-white"
        >
          About
        </div>

        <h1 className="text-lg font-bold p-2">Summary of our Terms</h1>

        <div className="w-full h-full mt-1 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quae.
          Similique a facilis delectus non quam reprehenderit quas obcaecati
          nemo accusamus possimus unde harum, vitae ullam, voluptas recusandae
          accusantium minima.

          <h1 className="text-red-500 text-center py-4">This app is developed by Md Aman</h1>
        </div>
      </div>
    </>
  );
}
