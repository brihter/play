## prereq

```
sudo add-apt-repository ppa:chris-needham/ppa
sudo apt-get update
sudo apt-get install audiowaveform

sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 10
pipenv --python 3.6
pip install librosa
```

## processing

```
audiowaveform -i sample.mp3 -o waveform.dat -b 8
python beats.py -i sample.mp3 > beats.json
```
