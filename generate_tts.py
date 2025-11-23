#!/usr/bin/env python3
"""
TTS Audio File Generator for Byte-App Emergency Procedures

This script generates text-to-speech audio files for all emergency procedures.
It uses the gTTS (Google Text-to-Speech) library to convert text to MP3 files.

Requirements:
    pip install gtts

Usage:
    python generate_tts.py
"""

import os

from gtts import gTTS

# Define all procedure steps with their text
procedures = {
    'cpr': [
        'Check the scene for safety and ensure the person is on a firm, flat surface.',
        'Check for breathing. If unresponsive and not breathing, call emergency services immediately.',
        'Open the patient\'s airway using the head-tilt to make sure suffocation won\'t happen.',
        'Perform 30 compressions followed by 2 rescue breaths if trained.',
        'Continue until professional help arrives or the person shows signs of life.',
    ],
    'choke': [
        'Ask "Are you choking?" If they can\'t speak, cough, or breathe, they need immediate help. Call 911 or have someone else call.',
        'Stand behind the person and wrap your arms around their waist. Make sure they are standing or sitting upright.',
        'Make a fist with one hand and place it just above the person\'s navel, below the ribcage. Grab your fist with your other hand.',
        'Give quick, upward thrusts into the abdomen. Use firm pressure as if trying to lift the person up.',
        'Repeat thrusts until the object is dislodged or the person becomes unconscious. If unconscious, begin CPR and call 911 immediately.',
    ],
    'bleed': [
        'Call 911 immediately for severe bleeding. Ensure your safety first - wear gloves if available to avoid contact with blood.',
        'Have the person lie down and elevate the injured area above the heart if possible. This helps reduce blood flow to the wound.',
        'Apply direct pressure to the wound using a clean cloth, gauze, or your hand. Press firmly and continuously.',
        'If blood soaks through, add more cloth on top - do NOT remove the original cloth. Continue applying firm pressure.',
        'Once bleeding slows, secure the cloth with a bandage or tape. Keep the wound elevated and the person still.',
        'Monitor for shock (pale skin, rapid breathing, weakness). Keep the person warm and calm until help arrives.',
    ],
    'break': [
        'Call 911 if the break is severe, involves the head/neck/back, or bone is protruding. Do not move the person unless necessary.',
        'Do NOT try to realign the bone or push protruding bones back in. Keep the injured area as still as possible.',
        'Immobilize the injured area using a splint or padding. You can use rolled newspapers, boards, or pillows to keep it stable.',
        'Apply ice packs wrapped in cloth to reduce swelling. Do not apply ice directly to skin. Ice for 15-20 minutes at a time.',
        'Treat for shock if needed - keep the person warm and lying down. Elevate legs slightly if no spinal injury is suspected.',
        'Monitor circulation below the injury - check for numbness, tingling, or color changes. Seek medical attention immediately.',
    ],
    'head': [
        'Call 911 if the person is unconscious, vomiting, having seizures, or bleeding heavily. Keep the person still and calm.',
        'If the person is conscious, have them lie down with head and shoulders slightly elevated. Do NOT move them if neck/spine injury is suspected.',
        'Apply a cold compress or ice pack wrapped in cloth to any bumps or swelling. Do not apply pressure to a skull fracture.',
        'If there is bleeding, apply gentle pressure with a clean cloth. Do NOT remove any objects stuck in the wound.',
        'Watch for signs of concussion: confusion, dizziness, slurred speech, memory loss, or unequal pupil sizes. Note any changes.',
        'Keep the person awake and talking until help arrives. Monitor breathing and consciousness. Seek medical attention even if symptoms seem mild.',
    ],
    'epipen': [
        'Call 911 immediately if someone is having a severe allergic reaction (anaphylaxis): difficulty breathing, swelling, hives, or rapid pulse.',
        'Remove the EpiPen from its carrier tube. Hold it firmly with the orange tip pointing downward. Do NOT put your thumb on either end.',
        'Remove the blue safety cap by pulling it straight off. You will hear a click - this means it\'s ready to use.',
        'Place the orange tip against the outer thigh (can go through clothing). Push down hard until you hear a click and hold firmly for 3 seconds.',
        'Remove the EpiPen and massage the injection area for 10 seconds. The orange tip will extend to cover the needle.',
        'Have the person lie down with legs elevated (unless having trouble breathing - then sit up). Stay with them until emergency help arrives. A second dose may be needed after 5-15 minutes.',
    ],
}

def generate_tts_files():
    """Generate TTS audio files for all procedures."""
    base_dir = 'app/tts'

    # Create base directory if it doesn't exist
    os.makedirs(base_dir, exist_ok=True)

    print("🎙️  Generating TTS audio files...\n")

    for procedure_name, steps in procedures.items():
        # Create procedure directory
        procedure_dir = os.path.join(base_dir, procedure_name)
        os.makedirs(procedure_dir, exist_ok=True)

        print(f"📁 Processing {procedure_name.upper()}...")

        for i, text in enumerate(steps, start=1):
            filename = f"{procedure_name}{i}.mp3"
            filepath = os.path.join(procedure_dir, filename)

            # Fix pronunciation issues
            # Replace "911" with "9 1 1" so it's pronounced correctly
            tts_text = text.replace("911", "9 1 1")

            # Generate TTS audio
            try:
                tts = gTTS(text=tts_text, lang='en', slow=False)
                tts.save(filepath)
                print(f"   ✅ Created: {filename}")
            except Exception as e:
                print(f"   ❌ Error creating {filename}: {e}")

        print()

    print("🎉 All TTS audio files generated successfully!")
    print(f"\n📂 Files saved in: {base_dir}/")

if __name__ == "__main__":
    try:
        generate_tts_files()
    except ImportError:
        print("❌ Error: gTTS library not found!")
        print("\nPlease install it by running:")
        print("   pip install gtts")
        print("\nOr if you're using pip3:")
        print("   pip3 install gtts")

