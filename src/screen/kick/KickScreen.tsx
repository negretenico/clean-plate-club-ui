import React, { useState, useEffect } from 'react';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';

function KickScreen (): JSX.Element {
    type gender = 'MALE' | 'FEMALE'
    type fitnesGoal = 'FAT_LOSS' | 'GENERAL_HEALTH' | 'MUSCLE_GAIN';
    interface macro {
      calories: number | string
      protein: number | string
      carbs: number | string
      fat: number | string
    }
    type goalMap = {
      [gen in gender]: {
        [fintes in fitnesGoal]: macro
      }
    }
    const goals: goalMap = {
      FEMALE: {
        FAT_LOSS: { calories: 870, protein: 90, carbs: 60, fat: 30 },
        GENERAL_HEALTH: { calories: 960, protein: 75, carbs: 75, fat: 40 },
        MUSCLE_GAIN: { calories: 905, protein: 90, carbs: 80, fat: 30 }
      },
      MALE: {
        FAT_LOSS: { calories: 1450, protein: 175, carbs: 120, fat: 30 },
        GENERAL_HEALTH: { calories: 1435, protein: 140, carbs: 140, fat: 35 },
        MUSCLE_GAIN: { calories: 1480, protein: 175, carbs: 150, fat: 30 }
      }
    };
    const [data, setData] = useState<{ gender: gender, goals: fitnesGoal }>({ gender: 'FEMALE', goals: 'FAT_LOSS' });

    useEffect(() => {
      const requestBody = JSON.parse(localStorage.getItem('requestBody') ?? '{}');
      setData(requestBody);
    }, []);

    const createMarkdown = (): string => {
      const macros = goals[data.gender][data.goals];
      return `These macros are intake amounts per day!\n\nFor a ${data.gender} with the goal of ${data.goals}\n\n- Calories: ${macros.calories}\n- Protein: ${macros.protein}\n- Carbs:  ${macros.carbs}\n- Fat:  ${macros.fat}\n\n`;
    };
    return (
      <>
        <MarkdownComponenet md={createMarkdown()}/>
      </>
    );
}
export default KickScreen;
