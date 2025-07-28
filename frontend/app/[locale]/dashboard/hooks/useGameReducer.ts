import { useReducer } from "react";
import type { GameState, GameAction, CreateGameDto } from "../types/dashboard.types";

const initialCreateGameData: CreateGameDto = {
  bet: 50,
  thinkingTime: 30,
};

const initialState: GameState = {
  gameMode: 'solo',
  showCreateForm: false,
  selectedGame: null,
  showConfetti: false,
  gameTimer: null,
  showRechargeModal: false,
  blinkingElement: null,
  createGameData: initialCreateGameData,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_GAME_MODE':
      return { ...state, gameMode: action.payload };
    
    case 'TOGGLE_CREATE_FORM':
      return { ...state, showCreateForm: !state.showCreateForm };
    
    case 'SET_CREATE_FORM':
      return { ...state, showCreateForm: action.payload };
    
    case 'SET_SELECTED_GAME':
      return { ...state, selectedGame: action.payload };
    
    case 'SET_CONFETTI':
      return { ...state, showConfetti: action.payload };
    
    case 'SET_GAME_TIMER':
      return { ...state, gameTimer: action.payload };
    
    case 'TOGGLE_RECHARGE_MODAL':
      return { ...state, showRechargeModal: !state.showRechargeModal };
    
    case 'SET_RECHARGE_MODAL':
      return { ...state, showRechargeModal: action.payload };
    
    case 'SET_BLINKING_ELEMENT':
      return { ...state, blinkingElement: action.payload };
    
    case 'UPDATE_CREATE_GAME_DATA':
      return {
        ...state,
        createGameData: { ...state.createGameData, ...action.payload },
      };
    
    case 'RESET_CREATE_GAME_DATA':
      return { ...state, createGameData: initialCreateGameData };
    
    default:
      return state;
  }
};

export const useGameReducer = (initialGameMode?: 'solo' | 'multiplayer') => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    gameMode: initialGameMode || 'solo',
  });

  return { state, dispatch };
};