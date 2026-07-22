# VisuLang 🚀

An innovative, hybrid cross-platform programming language designed to build software seamlessly for **mobiles, tablets, and desktops**. 

## 🔊 Pronunciation
VisuLang is officially pronounced as **/vɪʒuˈləŋ/** (*Vî-jú-LĂNG*).

---

## ✨ Key Features
* **Dual-Nature Syntax**: Can be used as a high-level visual/scripting engine or extended into low-level hardware control depending on the file extension.
* **Variable Declaration**: Variables are created sequentially using the `var` keyword followed by the assignment operator (e.g., `var score = 100`).
* **Modular Extensions**: Modules are imported on demand using a clean syntax (e.g., `import Sys, UI`).
* **Top-Level Execution**: No boilerplate! Scripts can run sequentially from top to bottom without mandatory function wrappers.
* **Control Flow & Indentation**: Conditional statements use the `if` keyword, followed by the strict equality operator `===` and a colon `:`. Code blocks are defined by **indentation** (spacing) instead of curly braces.

---

## 📜 The Historical First Program: Deja-Vu Algorithm
The very first script written in VisuLang solves the famous **Deja-Vu riddle** using the official `UI Extension` (`UI.`).

```text
// File: dejavu.vl
import Sys, UI

UI.window("Deja-Vu Riddle", 450, 700)

UI.text("Among 4 algorithms, there are A, B, C, and D.")
UI.text("If one more algorithm arrives:")
UI.text("- A pretends nothing happened")
UI.text("- B is afraid")
UI.text("- C tells D")
UI.text("- and D is jealous.")

UI.space(20)

UI.button("Reveal Who Entered", function() {
    Sys.print_raw("Triggering Deja-Vu Algorithm resolution.")
    
    // Declaring the answer using the official variable syntax
    var answer = "E"
    UI.show_dialog("Deja-Vu Answer", "It was the Algorithm " + answer + "!")
})

UI.render()
```

### 🧠 The Logic Behind the Riddle
When the button is clicked, it reveals that **Algorithm E** entered! 
The alphabetical order flows as a phonetic joke (*A-B-C-D-E!*), making it a memorable milestone for our language ecosystem.

---

## 🛠️ Architecture & Compilation Strategy
VisuLang uses a high-performance **transpilation architecture** to target multiple platforms without sacrificing speed:
* **High-Level Layers (`.vl`, `.vlui`)**: Automatically converted into clean **JavaScript**. This allows the language to run everywhere (Web, iOS, Android, and Desktop via runtime environments).
* **Low-Level Layers (`.vlx`, `.vlsys`)**: Converted into native **C code**, linking directly with hardware headers like `Sys.h`. This ensures maximum performance, direct memory management, and zero overhead for system-level operations.


---

## ⚖️ License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details. Anyone is free to use, modify, and distribute VisuLang.
