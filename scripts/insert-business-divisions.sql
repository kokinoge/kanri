-- 事業部マスターデータを挿入
INSERT INTO masters (id, category, value, "order") VALUES
('bd_master_1', 'businessDivision', 'SNSメディア事業部', 1),
('bd_master_2', 'businessDivision', 'インフルエンサー事業部', 2),
('bd_master_3', 'businessDivision', '広告事業部', 3)
ON CONFLICT (id) DO NOTHING; 