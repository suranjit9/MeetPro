import MeetingTypeList from "@/components/MeetingTypeList";

const HomePage = () => {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <section className="flex size-full flex-col gap-10 text-white ">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className=" glassmorphism max-w-[270px] rounded text-center text-base font-normal">
            Upcomming
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extralight lg:text-7xl">{time}</h1>
            <p className="text-lg font-semibold text-sky-1 lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default HomePage;
