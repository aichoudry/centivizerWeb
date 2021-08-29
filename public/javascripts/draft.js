       $(document).keypress(function(event){
      console.log(String.fromCharCode(event.which));
      if ('qweasd'.indexOf(String.fromCharCode(event.which)) !== -1 ){
        window.location.href = '/nav'
      }
      else if ('p'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    window.location.href = '/peddler'
  }
else if ('l'.indexOf(String.fromCharCode(event.which)) !== -1 ){
  console.log("l keyboard");
    if (direction_name == "Right") {
      //  direction_v.rotation.y = Math.PI / 2;
    }
    direction_name = "Left";
    timer = 0;
  }
  else if ('r'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    if (direction_name == "Left") {
      //direction_v.rotation.y = Math.PI / 2;

    }
    direction_name = "Right";
    timer = 0;
  }

      });