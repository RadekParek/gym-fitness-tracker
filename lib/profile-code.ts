export function generateProfileCode(): string {
  const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const generateSegment = () => {
    let segment = '';
    for (let i = 0; i < 4; i++) {
      segment += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return segment;
  };

  return `APEX-${generateSegment()}-${generateSegment()}`;
}
