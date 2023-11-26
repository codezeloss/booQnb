function Spinner() {
  return (
    <div className="absolute top-0 right-0 h-screen w-full flex items-center justify-center z-50 bg-white dark:bg-background">
      <div className="w-20 h-20 rounded-full animate-spin border-8 border-solid border-black dark:border-white border-t-transparent dark:border-t-black" />
    </div>
  );
}

export default Spinner;
