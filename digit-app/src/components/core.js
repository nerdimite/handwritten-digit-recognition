export const Container = (props) => {
  return (
    <div className="md:container md:w-3/5 space-y-4 mt-4 mb-10 mx-4">
      {props.children}
    </div>
  );
};

export const Paper = (props) => {
  return (
    <div className="p-6 text-left rounded-lg shadow-lg bg-white">
      {props.children}
    </div>
  );
};

export const Label = (props) => {
  return (
    <div className=" text-md md:text-lg mb-2">
      <span className="text-gray-600 font-semibold">{props.children}</span>{" "}
    </div>
  );
};

export const Textbox = (props) => {
  return (
    <input
      type="text"
      className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600 mb-3"
      {...props}
    />
  );
};

export const Textarea = (props) => {
  return (
    <textarea
      type="text"
      className="w-full resize-none mt-1 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600"
      rows="7"
      {...props}
    />
  );
};

export const Button = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-200 ${
        props.disabled && "cursor-not-allowed"
      }`}
      disabled={props.disabled}
    >
      {props.loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.children}
    </button>
  );
};

export const Barchart = (props) => {
  const color_map = ["blue", "indigo", "red", "rose", "orange", "amber"];

  return (
    <div className="mb-4">
      {props.data.map((item, idx) => {
        idx = idx % color_map.length;
        let label = item[0];
        let value = item[1];

        if (props.transform && props.transform.type === "math") {
          let expr = props.transform.expression.replace("x", item[1]);
          value = eval(expr);
        }

        return (
          <div key={idx} className="mb-2">
            <Badge
              label={`${label}: ${value.toFixed(2)}%`}
              color={color_map[idx]}
            />
            <Progress value={value} color={color_map[idx]} />
          </div>
        );
      })}
    </div>
  );
};

export const Progress = (props) => {
  const color_map = {
    blue: ["bg-blue-200", "bg-blue-600"],
    indigo: ["bg-indigo-200", "bg-indigo-600"],
    red: ["bg-red-200", "bg-red-600"],
    rose: ["bg-rose-200", "bg-rose-600"],
    orange: ["bg-orange-200", "bg-orange-600"],
    amber: ["bg-amber-200", "bg-amber-600"],
  };

  return (
    <div className="relative transition ease-in duration-500">
      <div
        className={`overflow-hidden h-3 text-xs flex rounded-full ${
          color_map[props.color][0]
        }`}
      >
        <div
          style={{ width: `${props.value}%` }}
          className={`shadow-none flex flex-col text-center rounded-full whitespace-nowrap text-white justify-center ${
            color_map[props.color][1]
          }`}
        ></div>
      </div>
    </div>
  );
};

export const Badge = (props) => {
  const color_map = {
    blue: "text-blue-600 bg-blue-200",
    indigo: "text-indigo-600 bg-indigo-200",
    red: "text-red-600 bg-red-200",
    rose: "text-rose-600 bg-rose-200",
    orange: "text-orange-600 bg-orange-200",
    amber: "text-amber-600 bg-amber-200",
  };

  return (
    <span
      className={`py-1 px-3 font-semibold inline-block rounded-full mt-2 mb-2 ${
        color_map[props.color]
      }`}
    >
      {props.label}
    </span>
  );
};

{
  /* <button
              className="p-2 rounded-md bg-green-300 text-green-700 hover:bg-green-600 hover:text-green-200 
              transition ease-in-out duration-200 flex items-center gap-1"
              onClick={handleExport}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span className="font-semibold text-lg">Predict</span>
            </button> */
}
{
  /* <div className="h-[280px] w-full md:w-[328px] bg-blue-300">
              dadasd
            </div> */
}
