//diff legend
//'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']
// 0    11   10    9    8     7    6     5    4    3     2    1  

var instruments = {
  "gbass": {
    "name": "G-Bass (GDAE)",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "A", "D", "G"],
    "stringDiff": [
      0,
      7,
      2,
      9
    ]
  },
  "abass": {
    "name": "A-Bass (ADAE)",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "A", "D", "A"],
    "stringDiff": [
      0,
      7,
      2,
      7
    ]
  },
  "gorrlaus": {
    "name": "Gorrlaus (FDAE)",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "A", "D", "F"],
    "stringDiff": [
      0,
      7,
      2,
      11
    ]
  },
  "ddae": {
    "name": "DDAE",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "A", "D", "D"],
    "stringDiff": [
      0,
      7,
      2,
      7
    ]
  },
  "gdad": {
    "name": "GDAD",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["D", "A", "D", "G"],
    "stringDiff": [
      2,
      7,
      2,
      9
    ]
  },
  "adad": {
    "name": "ADAD",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["D", "A", "D", "A"],
    "stringDiff": [
      2,
      7,
      2,
      7
    ]
  },
  "aeae": {
    "name": "DDAE",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "A", "D", "D"],
    "stringDiff": [
      0,
      7,
      2,
      2
    ]
  },
  "troll": {
    "name": "Troll (AEAC#)",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["C#", "A", "E", "A"],
    "stringDiff": [
      3,
      7,
      0,
      7  
    ]
  }
};
