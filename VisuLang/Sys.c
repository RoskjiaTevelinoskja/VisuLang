// File: Sys.h
// Low-level hardware and system abstraction layer for VisuLang

#ifndef SYS_H
#define SYS_H

#include <stdio.h>

#ifdef _WIN32
    #include <windows.h>
#else
    #include <unistd.h>
#endif

// Namespace simulation using static structure
struct Sys_Module {
    // Transpiles VisuLang's Sys.print_raw() to native C printf
    void (*print_raw)(const char* message);
    
    // Transpiles VisuLang's Sys.delay() to cross-platform sleep
    void (*delay)(int milliseconds);
};

// Implementations of the low-level functions
static void _sys_print_raw(const char* message) {
    printf("%s\n", message);
}

static void _sys_delay(int milliseconds) {
    #ifdef _WIN32
        Sleep(milliseconds);
    #else
        usleep(milliseconds * 1000); // Convert to microseconds
    #endif
}

// Global instance that mimics the "Sys." dot notation in C
static const struct Sys_Module Sys = {
    .print_raw = _sys_print_raw,
    .delay = _sys_delay
};

#endif // SYS_H
