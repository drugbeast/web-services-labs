CREATE TABLE club (
    id SERIAL PRIMARY KEY,         
    name VARCHAR(100) NOT NULL,    
    country VARCHAR(100) NOT NULL,
    coach VARCHAR(100) NOT NULL,    
    estdate DATE NOT NULL          
);

INSERT INTO club (name, country, coach, estdate) VALUES
  ('Барселона', 'Испания', 'Ханс-Дитер Флик', '1899-11-29'),
  ('Реал Мадрид', 'Испания', 'Карло Анчелотти', '1902-03-06'),
  ('Ювентус', 'Италия', 'Тиагу Мотта', '1897-11-01'),
  ('Пари Сен-Жермен', 'Франция', 'Луис Энрике', '1970-08-12'),
  ('Манчестер Юнайтед', 'Англия', 'Эрик тен Хаг', '1878-01-01');