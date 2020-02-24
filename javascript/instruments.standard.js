var instruments = {
  "guitar": {
    "name": "guitar",
    "numStrings": 6,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "B", "G", "D", "A", "E"],
    "stringDiff": [
      0, // E string (high)
      5, // B string
      9, // G string
      2, // D string
      7, // A string
      0 // E string (low)
    ]
  },
  "bass": {
    "name": "bass",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["G", "D", "A", "E"],
    "stringDiff": [
      9, // G string
      2, // D string
      7, // A string
      0 // E string
    ]
  },
  "mandolin": {
    "name": "mandolin",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 9, 12, 15],
    "stringLabels": ["E", "A", "D", "G"],
    "stringDiff": [
      0, // E string
      7, // A string
      2, // D string
      9 // G string
    ]
  },
  "ukulele": {
    "name": "ukulele",
    "numStrings": 4,
    "fretsToLabel": [1, 3, 5, 7, 10, 12, 15],
    "stringLabels": ["A", "E", "C", "G"],
    "stringDiff": [
      7, // A string
      0, // E string
      4, // C string
      9 // G string
    ]
  }
};
