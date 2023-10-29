import pandas as pd
import random
import streamlit as st
import webbrowser
import urllib
df = pd.read_csv('gymdata.csv')

# Function to filter exercises based on user input
def filter_exercises(user_input):
    filtered_df = df.copy()

    # Filter based on Type
    if 'Type' in user_input and user_input['Type']:
        filtered_df = filtered_df[filtered_df['Type'].isin(user_input['Type'])]

    # Filter based on BodyPart
    if 'BodyPart' in user_input and user_input['BodyPart']:
        filtered_df = filtered_df[filtered_df['BodyPart'].isin(user_input['BodyPart'])]

    # Filter based on Equipment
    if 'Equipment' in user_input and user_input['Equipment']:
        filtered_df = filtered_df[filtered_df['Equipment'].isin(user_input['Equipment'])]

    # Filter based on Level
    if 'Level' in user_input and user_input['Level']:
        filtered_df = filtered_df[filtered_df['Level'].isin(user_input['Level'])]

    return filtered_df


# Function to recommend exercises
def recommend_exercises(user_input):
    # Filter the exercises based on user input
    filtered_exercises = filter_exercises(user_input)

    # Check if the filtered DataFrame is empty
    if filtered_exercises.empty:
        st.write("No exercises found with the selected criteria.")
        return None

    # Randomly select 5 exercises from the filtered dataset
    recommended_exercises = filtered_exercises.sample(n=min(5, len(filtered_exercises)))

    return recommended_exercises

# Function to open a web browser and search for an exercise on YouTube

def youtube_link(exercise_name):
    query = exercise_name + " exercise"
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.youtube.com/results?search_query={encoded_query}"
    return f"[{exercise_name}]({url})"

# Main function for Streamlit app
def main():
    st.title('Exercise Recommendation')

    # Set the background image using custom CSS
    
    # Display user input section with dropdown menus
    st.sidebar.title('User Input')

    # Exercise Types dropdown
    exercise_types = st.sidebar.multiselect('Select Exercise Types', df['Type'].unique(), default=["Cardio"])

    # Body Parts dropdown
    body_parts = st.sidebar.multiselect('Select Body Parts', df['BodyPart'].unique())

    # Equipment dropdown
    equipment = st.sidebar.multiselect('Select Equipment', df['Equipment'].unique())

    # Levels dropdown
    levels = st.sidebar.multiselect('Select Levels', df['Level'].unique())

    # Combine user input into a dictionary
    user_input = {
        'Type': exercise_types,
        'BodyPart': body_parts,
        'Equipment': equipment,
        'Level': levels
    }

    # Filter the exercises based on user input
    filtered_exercises = recommend_exercises(user_input)

    # Display the filtered exercises
    st.subheader("Suggested Exercises(Click to search in YouTube):")
    if len(filtered_exercises) > 0:
        for _, exercise_row in filtered_exercises.iterrows():
            exercise_name = exercise_row['Title']
            st.markdown(youtube_link(exercise_name), unsafe_allow_html=True)

if __name__ == '__main__':
    main()