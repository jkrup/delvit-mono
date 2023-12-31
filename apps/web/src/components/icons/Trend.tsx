import React from "react";

const Trend = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="none"
    >
      <path
        d="M9.23029 8.33686C9.39192 8.51682 9.61116 8.61795 9.83978 8.618H10.345C10.5736 8.61795 10.7928 8.51682 10.9544 8.33686L15.0123 3.82031L16.989 6.02053V0.263306H11.8165L13.7933 2.46353L10.0924 6.58282L7.50613 3.70421C7.3445 3.52425 7.12526 3.42312 6.89664 3.42306H6.39146C6.16284 3.42312 5.9436 3.52425 5.78197 3.70421L0 10.1398L1.21898 11.4966L6.64405 5.45824L9.23029 8.33686Z"
        fill={color}
      />
    </svg>
  );
};

export default Trend;
