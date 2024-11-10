// Finally або просто код?
function f() {
  try {
    alert('start');
    return "result";
  } catch (err) {
    // ...
  } finally {
    alert('cleanup!');
  }
}

f(); // "cleanup!" буде виведено, навіть якщо є return

function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (err) {
    // обробка помилки
    if("can't handle the error") {
      throw err;
    }
  } finally {
    alert('cleanup!');
  }
}

f(); // "cleanup!" буде виведено, навіть якщо є помилка


// Успадкування від SyntaxError
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

let err = new FormatError("formatting error");

alert(err.message); // "formatting error"
alert(err.name); // "FormatError"
alert(err.stack); // стек викликів

alert(err instanceof SyntaxError); // true, оскільки FormatError успадковує SyntaxError
