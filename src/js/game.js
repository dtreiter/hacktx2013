var mySong = Songs[0];

	var run_game = false;
        var FRAME_RATE = 60;
        var INIT_X = 100;
        var VERT_SPACING;
        var BEAT_LENGTH_SIZE = 120;
        var NUM_NOTES = 12;
        var NOTE_TOL = 50;
	var DEFAULT_COLOR = "#F5B800";
	var DO_IT_COLOR = "#F00";
	var BINGO_COLOR = "#0F0";

        var canvas, width, height;
      	var notes;
        var stage;
      	var userPitchLine;
      	var userPitchCircle;
      	var lineX;
      	var userPitch;
      	var userPitchWasUndefined;
	var rects;
        var markerX;
	var highlighted;
	var moveSpeed;
	var audio_start;
	var score_container = document.getElementById("score");
	var curColor; 

        // 12 * (Math.log(frequency / 440) / Math.log(2) ) // + 69

        function init() {
			mySong = Songs[window.songId];
            canvas = document.getElementById('note-cont');
            width = canvas.width;
            height = canvas.height;
	    userPitchLine = new createjs.Shape();
            userPitchLine.graphics.setStrokeStyle(1).beginStroke("black").moveTo(100,100);
	    userPitchCircle = new createjs.Shape();
    	    userPitchCircle.graphics.beginStroke("red").drawCircle(0, 0, 40);
	    userPitchCircle.x = markerX;
	moveSpeed = (mySong.bpm / 60) * (BEAT_LENGTH_SIZE / FRAME_RATE);
        markerX = 1/4*width;
	    userPitchCircle.x = markerX;
	    userPitchCircle.y = 100;
	audio_start = (((canvas.width - markerX) / moveSpeed) / 60) - mySong.startTime;
	    toggleLiveInput();
		
            VERT_SPACING = height / NUM_NOTES;
            stage = new createjs.Stage(canvas);
            createjs.Ticker.setFPS(FRAME_RATE);

            var curTimeMarker = new createjs.Shape();
            lineX = markerX;
            var g = curTimeMarker.graphics;
            g.beginFill("#FFF");
            g.drawRect(markerX, 0, 1, height);
            g.endFill();
            stage.addChild(curTimeMarker);

            rects = new Array();
            var beat = 0;
	    curColor = Array(mySong.notes.length);
            for (var i = 0; i < mySong.notes.length; i++) {
            	note = mySong.notes[i];
              var noteLength = note[1];
              var y = getYCoordFromNote(note[0]); // pitch
              var x = getXCoordFromBeat(beat);
              var width = noteLength * BEAT_LENGTH_SIZE - 2;
              var height = NOTE_TOL;
              rects.push(new createjs.Rectangle(0, y + (width/2), width, height));
	      rects[i].mahX = x;
              beat += noteLength; // offset next note starting beat
	      curColor[i] = DEFAULT_COLOR;
            }
            //console.log(rects);

      	    notes = [];
            for (var i = 0; i < rects.length; i++) {
              var s = drawRectangle(rects[i], DEFAULT_COLOR);
	      notes.push(s);
	      notes[i].x = rects[i].mahX;
              stage.addChild(s);
            }

              stage.addChild(userPitchLine);
              stage.addChild(userPitchCircle);
      		stage.update();
      		createjs.Ticker.addListener(window);
           
		setInterval(function() { 
			score_container.innerHTML = "" + score;
		}, 1000);
        }

	var score = 0;
      	function tick() {
		if(run_game) { 
			var userNote = noteStrings[noteFromPitch(userPitch) % 12];
			var y_val = canvas.height - (userPitch / 4);
		        //y_val = 12 * (Math.log(y_val / 440) / Math.log(2) ) * VERT_SPACING + 69;
				y_val = 12 * (Math.log(y_val / 440) / Math.log(2) ) * VERT_SPACING + 600;
			if( !isNaN(y_val) ) {
				userPitchCircle.y = y_val;
			}
			for(var i = 0; i < notes.length; i++) {
				notes[i].x -= moveSpeed;
				var intersectingLine = (markerX > notes[i].x && markerX < (notes[i].x + rects[i].width));
				var intune = (y_val > rects[i].y && y_val < (rects[i].y + rects[i].height));
				var newColor = DEFAULT_COLOR;
				if( intersectingLine ) {
					var ydiff =  Math.abs( y_val - (rects[i].y + (rects[i].height/2)) );
					if( !isNaN(ydiff) ) {
						userPitchCircle.graphics.clear().beginStroke("black").drawCircle(0, 0, 40);
					}
					console.log(ydiff);
					newColor = DO_IT_COLOR;
					if( intune ) {
						score += 1;
						newColor = BINGO_COLOR;
					}
				}
				if( newColor != curColor[i] ){
					notes[i].graphics.clear().beginStroke("#000").beginFill(newColor).drawRect(rects[i].x, rects[i].y, rects[i].width, rects[i].height).endFill();
					curColor[i] = newColor;
				}

			}
			userPitchLine.x -= moveSpeed;
			lineX += moveSpeed;
			if(userPitch !== undefined){
				if( !isNaN(y_val) ) {
					userPitchLine.graphics.lineTo(lineX, y_val);
				}
				//console.log( noteStrings[noteFromPitch(userPitch) % 12] );
			} else {
				// userPitchLine.graphics.moveTo(lineX, canvas.height);
				userPitchWasUndefined = true;
			}
		}
      		stage.update();
      	}

        function getXCoordFromBeat(beat) {
          var HORIZ_OFFSET = canvas.width;
          return beat * BEAT_LENGTH_SIZE + HORIZ_OFFSET;
        }

        function getYCoordFromNote(note){
          var pos;
          //console.log(height);
          if (note == "C" || note == "B#") {
            pos = 6;
          } else if (note == "C#" || note == "Db") {
            pos = 5.5;
          } else if (note == "D") {
            pos = 5;
          } else if (note == "D#" || note == "Eb") {
            pos = 4.5;
          } else if (note == "E" || note == "Fb") {
            pos = 4;
          } else if (note == "F" || note == "E#") {
            pos = 3.5;
          } else if (note == "F#" || note == "Gb") {
            pos = 3;
          } else if (note == "G") {
            pos = 2.5;
          } else if (note == "G#" || note == "Ab") {
            pos = 2;
          } else if (note == "A") {
            pos = 1.5;
          } else if (note == "A#" || note == "Bb") {
            pos = 1;
          }  else if (note == "B" || note == "Cb") {
            pos = 0.5;
          } else {
            console.log("Invalid note");
            return null;
          }

          return pos * VERT_SPACING;
        }

        function drawRectangle(rect, color) {
	    var s = new createjs.Shape();
            var g = s.graphics;

            g.beginStroke("#000");
            g.beginFill(color);
            g.drawRect(rect.x, rect.y, rect.width, rect.height);
            g.endFill();

            return s;
	}
