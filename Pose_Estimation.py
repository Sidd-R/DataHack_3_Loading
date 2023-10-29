#!/usr/bin/env python
# coding: utf-8

# In[1]:


# !pip install tensorflow tensorflow_hub opencv-contrib-python matplotlib


# nose, left eye, right eye, left ear, right ear, left shoulder, right shoulder, left elbow, right elbow, left wrist, right wrist, left hip, right hip, left knee, right knee, left ankle, right ankle]. The remaining 5 elements [ymin, xmin, ymax, xmax, score]

# The height/width are both multiple of 32.
# The height to width ratio is close (and enough) to cover the original image's aspect ratio.
# Make the larger side to be 256 (one should adjust this based on the speed/accuracy requirements). For example, a 720p image (i.e. 720x1280 (HxW)) should be resized and padded to 160x256 image.

# Bench press, Pushup, Bicep Curl,
# Lateral Raise, Shoulder Press, and
# Squat,

# In[1]:


import tensorflow as tf
import tensorflow_hub as hub
import cv2
from matplotlib import pyplot as plt
import numpy as np
from pathlib import Path

loaded_model = tf.keras.models.load_model("models/recog.h5")


import mediapipe as mp

mp_hands = mp.solutions.hands
hands = mp_hands.Hands()


# In[18]:


# !pip install mediapipe==0.9.0.1


# In[ ]:





# In[2]:


model = hub.load("https://tfhub.dev/google/movenet/singlepose/thunder/4")
movenet = model.signatures['serving_default']


# In[3]:


EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}

color_mapping = {
    'r': (0, 0, 255),  # Red
    'g': (0, 255, 0),  # Green
    'b': (255, 0, 0),  # Blue
    'y': (0, 255, 255),  # Yellow
    'm': (255, 0, 255),  # Magenta
    'c': (255, 255, 0)  # Cyan
}

target_dim = 512

keypoint_names = [
    "nose", "left_eye", "right_eye", "left_ear", "right_ear",
    "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
    "left_wrist", "right_wrist", "left_hip", "right_hip",
    "left_knee", "right_knee", "left_ankle", "right_ankle"
]

remaining_elements = ["ymin", "xmin", "ymax", "xmax", "score"]


# In[4]:


total_joints = [["left_shoulder", "left_elbow", "left_wrist"], 
                ["right_shoulder", "right_elbow", "right_wrist"],]
#                 ["left_hip", "left_knee", "left_ankle"],
#                 ["right_hip", "right_knee", "right_ankle"]]


# In[5]:


def preprocess_frame(frame):
    height, width, channels = frame.shape

    if height > width:
        new_height = target_dim
        new_width = int(width * (target_dim / height))
        new_height = int(new_height // 32) * 32
        new_width = int(new_width // 32) * 32
    else:
        new_width = target_dim
        new_height = int(height * (target_dim / width))
        new_height = int(new_height // 32) * 32
        new_width = int(new_width // 32) * 32

    frame = cv2.resize(frame, (new_width, new_height))
    
    return frame, new_width, new_height


# In[6]:


def draw_connections(frame, keypoints, edges, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    
    for edge, color in edges.items():
        p1, p2 = edge
        y1, x1, c1 = shaped[p1]
        y2, x2, c2 = shaped[p2]
        
        if (c1 > confidence_threshold) & (c2 > confidence_threshold):      
            cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), color_mapping[color], 2)


# In[7]:


def draw_keypoints(frame, keypoints, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    
    for kp in shaped:
        ky, kx, kp_conf = kp
        if kp_conf > confidence_threshold:
            cv2.circle(frame, (int(kx), int(ky)), 3, (0,255,0), -1)


# In[8]:


def loop_through_people(frame, keypoints_with_scores, edges, confidence_threshold):
    image = frame.copy()
    
    for person in keypoints_with_scores:
        draw_connections(image, person, edges, confidence_threshold)
        draw_keypoints(image, person, confidence_threshold)
        
    return image


# In[9]:


def calculate_angle(frame, keypoints, total_joints):
    y, x, c = frame.shape
    for joint_names in total_joints:
        a, b, c = [keypoints[joint] for joint in joint_names]
#         ba = a - b
#         bc = c - b
#         cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
#         angle = np.arccos(cosine_angle)
#         angle = int(np.degrees(angle))
        
        angleInRad = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angleInDeg = np.abs(angleInRad * 180.0 / np.pi)

        angleInDeg = angleInDeg if angleInDeg <= 180 else 360 - angleInDeg

        cv2.putText(frame, str(int(angleInDeg)), (int(b[1]*x),int(b[0]*y)), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)
    return frame


# In[10]:


def final_dict_bp(keypoints):
    cnt = 0
    final_dict = {}
    
    new_kp = keypoints
    
#     new_kp = []
#     for kp in keypoints[0]:
#         if kp[55] > 0.1:
#             cnt += 1
#             new_kp.append(kp)
            
#     new_kp = np.asarray(new_kp)
    
    if len(new_kp) > 0:
        keypoints_with_scores = new_kp[:,:51].reshape((1,17,3))
    
        for idx,person_kp in enumerate(keypoints_with_scores):
            body_points = {}
            for i,name in enumerate(keypoint_names):
                body_points[name] = person_kp[i]

            final_dict[idx] = body_points
        
        return keypoints_with_scores, final_dict
    else:
        return -1;


# In[ ]:





# In[11]:


from utils import detect_bicep_curls, detect_pushup, detect_shoulder, detect_squats


# In[ ]:





# In[ ]:





# In[12]:


# biceps_curls, shoulder_press
# cap = cv2.VideoCapture(0)

# push_ups
# cap = cv2.VideoCapture('videos/adi_pushup.mp4')

# squats
cap = cv2.VideoCapture('videos/adi_squat.mp4')

rep_cnt = 0
prev_rep = False
fault = False

while cap.isOpened:
    ret, in_frame = cap.read()
    if not ret:
        print('No Input Video')
        break
        
    frame, new_width, new_height = preprocess_frame(in_frame)

    # Resize image
    img = frame.copy()
    # Height Width
    img = tf.image.resize_with_pad(tf.expand_dims(img, axis=0), 256,256)
    input_img = tf.cast(img, dtype=tf.int32)
    
    # Detection section
    results = movenet(input_img)
    keypoints = results['output_0'].numpy()
    keypoints = np.reshape(keypoints, (1,1,51))
        
    if final_dict_bp(keypoints) != -1:
        keypoints_with_scores, final_dict = final_dict_bp(keypoints)
 
        value = final_dict[0]

#         bicep_img, rep_cnt, prev_rep, fault = detect_bicep_curls(frame, value, rep_cnt, prev_rep, fault)
#         cv2.imshow('Bicep', bicep_img)

#         push_img, rep_cnt, prev_rep, fault = detect_pushup(frame, value, push_joints, rep_cnt, prev_rep, fault)
#         cv2.imshow('Push UP', push_img)

#         shoulder_img, rep_cnt, prev_rep, fault = detect_shoulder(frame, value, rep_cnt, prev_rep, fault)
#         cv2.imshow('Shoulder', shoulder_img)

        squat_img, rep_cnt, prev_rep, fault = detect_squats(frame, value, rep_cnt, prev_rep, fault)
        cv2.imshow('Squats', squat_img)

        # Render keypoints 
        loop_through_people(frame, keypoints_with_scores, EDGES, 0.1)
     
    cv2.imshow('Movenet Multipose', frame)
    
    if cv2.waitKey(10) & 0xFF==ord('q'):
        break
        
cap.release()
cv2.destroyAllWindows()


# In[13]:


cap.release()
cv2.destroyAllWindows()


# In[ ]:





# In[29]:


def recog(image):
    frame = image.copy()
    
    pad = 30
    h,w,_ = frame.shape
    
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(frame_rgb)
    
    k = cv2.waitKey(1)

    if results.multi_hand_landmarks:
        img = frame.copy()
        # Loop through each detected hand
        x_min, y_min, x_max, y_max = float('inf'), float('inf'), -float('inf'), -float('inf')
        
        for hand_landmarks in results.multi_hand_landmarks:
            # Extract hand bounding box coordinates
            for landmark in hand_landmarks.landmark:
                x, y, _ = int(landmark.x * w), int(landmark.y * h), landmark.z
                x_min = min(x_min, x)
                y_min = min(y_min, y)
                x_max = max(x_max, x)
                y_max = max(y_max, y)

        # Crop the hand from the frame
        hand_crop = img[y_min-pad:y_max+pad,x_min-pad:x_max+pad]
        
        # Resize the frame
        if 0 not in hand_crop.shape:
    
            resized_hand = cv2.resize(hand_crop, (250, 250))
            image = np.expand_dims(resized_hand, axis=0)
        
            class_probabilities = loaded_model.predict(image, verbose=False)

            prc = np.argmax(class_probabilities)
            
            if prc != -1:
                if prc == 0:
                    cv2.putText(frame, 'Bicep Curls',(100,100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
                else:
                    cv2.putText(frame, 'Shoulder Press',(100,100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
        
        
        cv2.imshow('Recognition', frame)


# In[ ]:





# In[55]:


video_sources = {
    "Bicep Curls": 0, 
    "Push Ups": "videos/adi_pushup.mp4",
    "Shoulder Press": 0,  
    "Squats": "videos/adi_squat.mp4"
}

def run_exercise_detection(exercise, rg):
    # Define the video source based on the selected exercise
    cap = cv2.VideoCapture(video_sources.get(exercise, 0))  # Default to webcam (0) if exercise not found

    rep_cnt = 0
    prev_rep = False
    fault = False


    while cap.isOpened():
        ret, in_frame = cap.read()
        if not ret:
            break
          
        if rg:
            recog(in_frame)
        
        frame, _ , _ = preprocess_frame(in_frame)

        # Resize image
        img = frame.copy()
        img = tf.image.resize_with_pad(tf.expand_dims(img, axis=0), 256, 256)
        input_img = tf.cast(img, dtype=tf.int32)

        # Detection section (Replace with your exercise-specific detection functions)
        results = movenet(input_img)
        keypoints = results['output_0'].numpy()
        keypoints = np.reshape(keypoints, (1, 1, 51))

        if final_dict_bp(keypoints) != -1:
            keypoints_with_scores, final_dict = final_dict_bp(keypoints)
    
            value = final_dict[0]

            # Render keypoints
            image = loop_through_people(frame, keypoints_with_scores, EDGES, 0.1)
            
        # Add your exercise-specific detection functions here
            if exercise == "Bicep Curls":
                bicep_img, rep_cnt, prev_rep, fault = detect_bicep_curls(frame, value, rep_cnt, prev_rep, fault)
                horizontal_concat = np.concatenate((bicep_img, image), axis=1)
                cv2.imshow('Bicep Curls', horizontal_concat)
                key = cv2.waitKey(10) & 0xFF
                if key == ord('q'):
                    break
                    
            elif exercise == "Push Ups":
                push_img, rep_cnt, prev_rep, fault = detect_pushup(frame, value, rep_cnt, prev_rep, fault)
                horizontal_concat = np.concatenate((push_img, image), axis=1)
                cv2.imshow('Push Ups', horizontal_concat)
                key = cv2.waitKey(10) & 0xFF
                if key == ord('q'):
                    break
                
            elif exercise == "Shoulder Press":
                shoulder_img, rep_cnt, prev_rep, fault = detect_shoulder(frame, value, rep_cnt, prev_rep, fault)
                horizontal_concat = np.concatenate((shoulder_img, image), axis=1)
                cv2.imshow('Shoulder Press', horizontal_concat)
                key = cv2.waitKey(10) & 0xFF
                if key == ord('q'):
                    break
                
            elif exercise == "Squats":
                squat_img, rep_cnt, prev_rep, fault = detect_squats(frame, value, rep_cnt, prev_rep, fault)
                horizontal_concat = np.concatenate((squat_img, image), axis=1)
                cv2.imshow('Squats', horizontal_concat)
                key = cv2.waitKey(10) & 0xFF
                if key == ord('q'):
                    break
                    
                
    cap.release()
    cv2.destroyAllWindows()
    


# In[56]:


choices = ["Bicep Curls","Push Ups", "Shoulder Press", "Squats"]

run_exercise_detection(choices[1], True)


# In[50]:





# In[ ]:




