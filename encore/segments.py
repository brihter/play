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

# segments
y, sr = librosa.load(filename)
feature = librosa.feature.rms(y=y, frame_length=1024) # group by
bounds = librosa.segment.agglomerative(feature, 20)
output = librosa.frames_to_time(bounds, sr=sr).tolist()

# stdout
print(json.dumps(output))
