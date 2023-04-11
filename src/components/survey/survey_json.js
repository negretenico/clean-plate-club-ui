export const surveyJSON ={
    "completedHtml": "<h3>Thank you for your feedback</h3>",
    "completedHtmlOnCondition": [
     {
      "expression": "{nps_score} >= 9",
      "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you love our product. Your ideas and suggestions will help us make it even better.</h4>"
     },
     {
      "expression": "{nps_score} >= 6  and {nps_score} <= 8",
      "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you shared your ideas with us. They will help us make our product better.</h4>"
     }
    ],
    "pages": [
     {
      "name": "Gender",
      "elements": [
       {
        "type": "radiogroup",
        "name": "gender",
        "title": "Are you male or female? ",
        "isRequired": true,
        "choices": [
         {
          "value": "MALE",
          "text": "Male"
         },
         {
          "value": "FEMALE",
          "text": "Female"
         }
        ]
       }
      ]
     },
     {
      "name": "Goal",
      "elements": [
       {
        "type": "dropdown",
        "name": "goals",
        "title": "What is your goal? ",
        "choices": [
         {
          "value": "MUSCLE_GAIN",
          "text": "Muscle gain"
         },
         {
          "value": "FAT_LOSS",
          "text": "Fat loss"
         },
         {
          "value": "GENERAL_HEALTH",
          "text": "General Health"
         }
        ]
       }
      ]
     },
     {
      "name": "Times You Do Eat",
      "elements": [
       {
        "type": "radiogroup",
        "name": "Times do you eat?",
        "title": "How many times do you eat a day? ",
        "choices": [
         "1-2",
         "2-3",
         "4+"
        ]
       }
      ]
     },
     {
      "name": "Times You Can Eat",
      "elements": [
       {
        "type": "radiogroup",
        "name": "Times can you eat?",
        "title": "How many times CAN you eat a day?",
        "choices": [
         "1-2",
         "2-3",
         "4+"
        ]
       }
      ]
     },
     {
      "name": "Food Allergies",
      "elements": [
       {
        "type": "boolean",
        "name": "Allergies?",
        "title": "Do you have any food allergies? "
       }
      ]
     },
     {
      "name": "Who's LifeTime Coach",
      "elements": [
       {
        "type": "dropdown",
        "name": "Coach",
        "title": "Who's your Life Time Coach?",
        "choices": [
         {
          "value": "Greg",
          "text": "Brian"
         },
         "Greg",
         "Other"
        ]
       }
      ]
     },
     {
      "name": "How much do you train",
      "elements": [
       {
        "type": "radiogroup",
        "name": "Days training",
        "title": "How many days a week do you train?",
        "choices": [
         {
          "value": "Item 1",
          "text": "3"
         },
         {
          "value": "Item 2",
          "text": "4"
         },
         {
          "value": "Item 3",
          "text": "5+"
         }
        ]
       }
      ]
     },
     {
      "name": "How often do you do cardio",
      "elements": [
       {
        "type": "radiogroup",
        "name": "How manyh days a week do you work out",
        "title": "How many days a week do you do cardio? ",
        "choices": [
         {
          "value": "Item 1",
          "text": "2"
         },
         {
          "value": "Item 2",
          "text": "3"
         },
         {
          "value": "Item 3",
          "text": "4+"
         }
        ]
       }
      ]
     }
    ],
    "navigateToUrl": "/kick",
    "showPageNumbers": true,
    "showQuestionNumbers": "off",
    "showProgressBar": "bottom",
    "progressBarType": "questions"
   }