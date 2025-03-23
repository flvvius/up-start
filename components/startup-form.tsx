import React from "react";

const StartupForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
    </form>
  );
};

export default StartupForm;
