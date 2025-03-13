class Erreur {
    constructor(message, code) {
      this.message = message;
      this.code = code;
      this.timestamp = new Date().toISOString();
    }
  
    logError() {
      console.error(`Error [${this.code}] - ${this.message} (Logged at: ${this.timestamp})`);
    }
  
    getErrorDetails() {
      return {
        message: this.message,
        code: this.code,
        timestamp: this.timestamp,
      };
    }
  }
  
  export default Erreur;
  