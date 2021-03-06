// "C"AL"C"ULATIONS
//
// bpm = 60 * beats/(tb - ta)


//Twinkle Twinkle Little Star
//
// ta = 3.37 se"c", tb = 9.70 se"c", 10 beats

//Kill Bill
//
// Tempo1 = 3.87
// ta = 1.93 sec, tb = 6.05, 16 beats 


var Songs = [
	{
				startTime : 0.56,
                bpm :  94.79,
                title : "Twinkle Twinkle Little Star",
                source : "twinkle-twinkle-little-star.mp3",
                notes : [["C",1,0,false],["C",1,0,false],["G",1,0,false],["G",1,0,false],["A",1,0,false],["A",1,0,false],["G",2,0,true],["F",1,0,false],["F",1,0,false],["E",1,0,false],["E",1,0,false],["D",1,0,false],["D",1,0,false],["C",2,0,true],
						 ["G",1,0,false],["G",1,0,false],["F",1,0,false],["F",1,0,false],["E",1,0,false],["E",1,0,false],["D",2,0,true],["G",1,0,false],["G",1,0,false],["F",1,0,false],["F",1,0,false],["E",1,0,false],["E",1,0,false],["D",2,0,true],
						 ["C",1,0,false],["C",1,0,false],["G",1,0,false],["G",1,0,false],["A",1,0,false],["A",1,0,false],["G",2,0,true],["F",1,0,false],["F",1,0,false],["E",1,0,false],["E",1,0,false],["D",1,0,false],["D",1,0,false],["C",2,0,true]]
	},

	{
                startTime : 1.93,
                bpm :  233.01, //this is double-time, eighth notes per minutes
                title : "Kill Bill",
                source : "KillBill.mp3",
                notes : [["C",2,1],["Bb",2,0],["C",1,1],["C",1,1],["Bb",2,0],["Bb",2,0],["Ab",2,0],["Bb",1,0],["Bb",1,0],["Ab",2,0],
						 ["C",1,1],["C",1,1],["Bb",1,0],["Bb",1,0],["C",1,1],["C",1,1],["Bb",2,0],["Bb",1,0],["Bb",1,0],["Ab",1,0],["Ab",1,0],["Bb",1,0],["Bb",1,0],["Ab",2,0],
						 ["G",1,0],["F",1,0],["G",1,0],["Ab",1,0],["G",1,0],["F",1,0],["G",1,0],["Ab",1,0],["G",1,0],["F",1,0],["G",1,0],["Ab",1,0],["Bb",2,0],
						 ["Ab",1,0],["Bb",1,0],["C",1,1],["Bb",1,0],["Ab",1,0],["Bb",1,0],["C",1,1],["Bb",1,0],["Ab",1,0],["Bb",1,0],["C",1,1],["Bb",1,0],["Ab",1,0],["Bb",4,0],
						 ["Ab",1,0],
						 ["C",2,1],["Bb",2,0],["C",1,1],["C",1,1],["Bb",2,0],["Bb",2,0],["Ab",2,0],["Bb",1,0],["Bb",1,0],["Ab",2,0],
						 ["C",1,1],["C",1,1],["Bb",1,0],["Bb",1,0],["C",1,1],["C",1,1],["Bb",2,0],["Bb",1,0],["Bb",1,0],["Ab",1,0],["Ab",1,0],["Bb",1,0],["Bb",1,0],["Ab",2,0],

	}	

];
