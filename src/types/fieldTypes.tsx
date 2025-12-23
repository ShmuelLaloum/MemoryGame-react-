export type Field = {
    name: string;
    color: string;
  };
export type CardType = {
  id: number;        
  emoji: string;     
  matched: boolean;  
};
export type CardProps = {
  card: CardType;
  handleClick: (card: CardType) => void;
  flipped: boolean;
};
export type ScoreType = {
  moves: number;
  time: number;
};