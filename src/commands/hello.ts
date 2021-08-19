import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";

const helloCommand = (value = {}) => {
    const wat = json({
      // Type 4 responds with the below message retaining the user's
      // input at the top.
      type: 4,
      data: {
        content: `Wat up, ${value}`
      },
    });
    return wat;
  };

export default helloCommand;
  