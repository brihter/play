import warnings
import json
import librosa
import argparse

warnings.filterwarnings('ignore')

# args
parser = argparse.ArgumentParser("processor")
parser.add_argument("-i", help="input file", type=str, dest="filename")
args = parser.parse_args()
filename = args.filename

# beat tracking
# y, sr = librosa.load(filename, duration=10)
y, sr = librosa.load(filename)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
beats = librosa.frames_to_time(beats, sr=sr).tolist()

# stdout
print(json.dumps(beats))
