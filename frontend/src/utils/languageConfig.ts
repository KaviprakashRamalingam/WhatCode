import { SupportedLanguage, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: SupportedLanguage.PYTHON, label: 'Python', mode: 'python' },
  { value: SupportedLanguage.JAVA, label: 'Java', mode: 'java' },
  { value: SupportedLanguage.TYPESCRIPT, label: 'TypeScript', mode: 'typescript' },
  { value: SupportedLanguage.REACT, label: 'React', mode: 'typescript' },
];

export const DEFAULT_CODE_TEMPLATES: Record<SupportedLanguage, string> = {
  [SupportedLanguage.PYTHON]: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

result = fibonacci(5)
print(f"Fibonacci of 5 is: {result}")`,

  [SupportedLanguage.JAVA]: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        
        for (int num : numbers) {
            sum += num;
        }
        
        System.out.println("Sum: " + sum);
    }
}`,

  [SupportedLanguage.TYPESCRIPT]: `function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

const result = factorial(5);
console.log(\`Factorial of 5 is: \${result}\`);`,

  [SupportedLanguage.REACT]: `import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}`,
};

