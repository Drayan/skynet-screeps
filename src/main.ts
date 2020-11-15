import "prototypes/Room";
import { ErrorMapper } from "utils/ErrorMapper";
import { _Empire } from "Empire";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  if(!Empire || Empire.mustRebuild) {
    delete global.Empire;
    global.Empire = new _Empire();

    //Build phase : Instantiate empire components
    console.log("Empire Build Phase");
    Empire.build();
  } else {
    //Refresh phase : Refresh components
    console.log("Refreshing empire state.");
    Empire.refresh();
  }

  //Main tick loop
  Empire.init();
  Empire.run();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

function onGlobalReset(): void {
  global.Empire = new _Empire();
}

onGlobalReset();
