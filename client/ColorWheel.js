export class ColorWheel {
  r = 0;
  g = 0;
  b = 255;
  step = 0;

  incrementColor(increment = 1) {
    switch(this.step) {
      case 0: 
        this.r += increment;
        if (this.r >= 255) this.step = (this.step + 1) % 6;
        break;
      case 1: 
        this.b -= increment;
        if (this.b <= 0) this.step = (this.step + 1) % 6;
        break;
      case 2: 
        this.g += increment;
        if (this.g >= 255) this.step = (this.step + 1) % 6;
        break;
      case 3: 
        this.r -= increment;
        if (this.r <= 0) this.step = (this.step + 1) % 6;
        break;
      case 4: 
        this.b += increment;
        if (this.b >= 255) this.step = (this.step + 1) % 6;
        break;
      case 5: 
        this.g -= increment;
        if (this.g <= 0) this.step = (this.step + 1) % 6;
        break;
    }
  }
}
