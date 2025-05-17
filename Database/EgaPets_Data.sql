Use EgaPets_DB
GO

-- ─────────────────────────────────────────────────────────────────────────
-- Data DanhMucSanPham
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO DanhMucSanPham (ten_danh_muc) VALUES
(N'Thức ăn cho thú cưng'),
(N'Đồ dùng tỉa lông'),
(N'Nhà vệ sinh'),
(N'Phụ kiện'),
(N'Đệm - Giường'),
(N'Dụng cụ chải lông'),
(N'Bánh thưởng'),
(N'Chăm sóc sức khỏe'),
(N'Đồ chơi'),
(N'Sữa tắm và vệ sinh');
GO

-- ─────────────────────────────────────────────────────────────────────────
-- Data SanPham
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO SanPham (ma_san_pham, ten_san_pham, thuong_hieu, so_gram, loai, nguon_goc, han_su_dung, so_luong, gia_thanh, giam_gia, danh_gia, thanh_phan, created_at, danh_muc_id)
VALUES
-- Danh mục 1: Thức ăn cho thú cưng
(N'P001', N'Royal Canin Medium Puppy', N'Royal Canin', 1000, N'Thức ăn cho chó', N'Pháp', '2026-05-15', 50, 350000, 10, 4.8, N'Protein, Vitamin E, DHA, Omega 3', GETDATE(), 1),
(N'P002', N'Pedigree Adult Beef', N'Pedigree', 1200, N'Thức ăn cho chó', N'Mỹ', '2025-10-20', 30, 290000, 5, 4.5, N'Thịt bò, Canxi, Chất xơ', GETDATE(), 1),
(N'P003', N'Whiskas Tuna Kitten', N'Whiskas', 500, N'Thức ăn cho mèo', N'Thái Lan', '2025-07-10', 40, 180000, 8, 4.7, N'Cá ngừ, Vitamin A, Taurine', GETDATE(), 1),
(N'P004', N'Ganador Salmon Adult', N'Ganador', 1500, N'Thức ăn cho chó', N'Tây Ban Nha', '2025-12-12', 60, 420000, 12, 4.6, N'Cá hồi, Omega 6, Chất đạm', GETDATE(), 1),
(N'P005', N'Me-O Chicken', N'Me-O', 800, N'Thức ăn cho mèo', N'Thái Lan', '2026-02-28', 55, 220000, 6, 4.4, N'Thịt gà, Taurine, Kẽm', GETDATE(), 1),

-- Danh mục 2: Đồ dùng tỉa lông
(N'P006', N'Kéo cắt lông cao cấp', N'Pet Groom', 250, N'Kéo cắt lông', N'Nhật Bản', '2030-01-01', 20, 450000, 0, 4.7, N'Thép không gỉ, Bọc cao su chống trượt', GETDATE(), 2),
(N'P007', N'Lược chải lông 2in1', N'FurMagic', 150, N'Lược chải lông', N'Anh', '2030-01-01', 30, 250000, 0, 4.8, N'Lược kim loại + cao su', GETDATE(), 2),
(N'P008', N'Bộ cắt lông điện không dây', N'Wahl', 500, N'Máy cắt lông', N'Mỹ', '2030-01-01', 15, 1200000, 5, 4.9, N'Pin sạc, lưỡi titan', GETDATE(), 2),
(N'P009', N'Lược gỡ rối cho chó mèo', N'Tangle-Free', 180, N'Lược gỡ rối', N'Pháp', '2030-01-01', 50, 300000, 0, 4.6, N'Răng silicon mềm mại', GETDATE(), 2),
(N'P010', N'Găng tay chải lông', N'PetEasy', 200, N'Găng tay chải lông', N'Thái Lan', '2030-01-01', 60, 180000, 0, 4.7, N'Silicone cao cấp', GETDATE(), 2),

-- Danh mục 3: Nhà vệ sinh
(N'P011', N'Nhà vệ sinh tự động', N'CatGenie', 5000, N'Nhà vệ sinh cho mèo', N'Mỹ', '2030-01-01', 10, 5000000, 5, 4.9, N'Công nghệ tự rửa, không mùi', GETDATE(), 3),
(N'P012', N'Cát vệ sinh hữu cơ', N'Biokat', 10000, N'Cát vệ sinh', N'Đức', '2027-01-01', 200, 300000, 0, 4.7, N'Than hoạt tính, khử mùi', GETDATE(), 3),
(N'P013', N'Khay vệ sinh cho chó', N'DogPotty', 1500, N'Khay vệ sinh', N'Hàn Quốc', '2030-01-01', 30, 450000, 0, 4.8, N'Nhựa cao cấp, dễ vệ sinh', GETDATE(), 3),
(N'P014', N'Bộ lọc khử mùi nhà vệ sinh', N'FreshPet', 200, N'Bộ lọc khử mùi', N'Nhật Bản', '2027-01-01', 40, 100000, 0, 4.6, N'Lọc than hoạt tính', GETDATE(), 3),
(N'P015', N'Thảm lau chân chống dính cát', N'PetComfort', 1000, N'Thảm vệ sinh', N'Mỹ', '2030-01-01', 50, 250000, 0, 4.8, N'Sợi microfiber, dễ giặt', GETDATE(), 3),

-- Danh mục 4: Phụ kiện
(N'P016', N'Vòng cổ LED chống lạc', N'GlowPet', 150, N'Vòng cổ', N'Anh', '2030-01-01', 80, 200000, 0, 4.9, N'Chống nước, sáng trong đêm', GETDATE(), 4),
(N'P017', N'Dây dắt chó kéo dài', N'Flexi', 300, N'Dây dắt', N'Đức', '2030-01-01', 100, 450000, 0, 4.7, N'Dây rút tự động, chịu lực cao', GETDATE(), 4),
(N'P018', N'Áo khoác chống lạnh', N'WinterPet', 400, N'Áo cho thú cưng', N'Canada', '2030-01-01', 50, 350000, 0, 4.8, N'Vải len giữ nhiệt', GETDATE(), 4),
(N'P019', N'Balo vận chuyển chó mèo', N'TravelPet', 2000, N'Balo vận chuyển', N'Mỹ', '2030-01-01', 40, 650000, 0, 4.9, N'Lưới thoáng khí, chống sốc', GETDATE(), 4),
(N'P020', N'Giường ngủ êm ái', N'ComfortNest', 3000, N'Giường thú cưng', N'Thái Lan', '2030-01-01', 30, 900000, 0, 4.8, N'Đệm bông mềm, vỏ tháo giặt', GETDATE(), 4),

-- Danh mục 5: Đệm - Giường
(N'P021', N'Đệm êm ái cho thú cưng', N'CozyPet', 2000, N'Đệm ngủ', N'Việt Nam', '2030-01-01', 30, 500000, 0, 4.9, N'Bông mềm, chống nước', GETDATE(), 5),
(N'P022', N'Giường gỗ cao cấp', N'PetLuxury', 3000, N'Giường gỗ', N'Canada', '2030-01-01', 20, 1200000, 0, 4.8, N'Gỗ sồi, đệm bông', GETDATE(), 5),
(N'P023', N'Chăn ấm cho mèo', N'FurryComfort', 1000, N'Chăn cho thú cưng', N'Mỹ', '2030-01-01', 50, 350000, 0, 4.7, N'Vải len giữ nhiệt', GETDATE(), 5),
(N'P024', N'Nệm cao su cho chó lớn', N'PawSoft', 4000, N'Nệm cao su', N'Anh', '2030-01-01', 25, 950000, 0, 4.9, N'Cao su thiên nhiên, chống trượt', GETDATE(), 5),
(N'P025', N'Gối nằm êm ái', N'ComfyPet', 800, N'Gối thú cưng', N'Nhật Bản', '2030-01-01', 40, 150000, 0, 4.7, N'Bông gòn cao cấp', GETDATE(), 5),

-- Danh mục 6: Dụng cụ chải lông
(N'P026', N'Bàn chải lông mềm', N'FurCare', 200, N'Bàn chải lông', N'Pháp', '2030-01-01', 60, 180000, 0, 4.8, N'Lông mềm, tay cầm chống trượt', GETDATE(), 6),
(N'P027', N'Lược chải lông hai mặt', N'FurryEase', 250, N'Lược chải lông', N'Mỹ', '2030-01-01', 50, 250000, 0, 4.9, N'Răng thép không gỉ + chải cao su', GETDATE(), 6),
(N'P028', N'Kéo tỉa lông chuyên nghiệp', N'PetGroom', 300, N'Kéo tỉa lông', N'Anh', '2030-01-01', 40, 600000, 0, 4.8, N'Thép Nhật, siêu sắc', GETDATE(), 6),
(N'P029', N'Găng tay chải lông', N'PetHandy', 150, N'Găng tay chải lông', N'Thái Lan', '2030-01-01', 100, 160000, 0, 4.7, N'Silicone mềm, dễ vệ sinh', GETDATE(), 6),
(N'P030', N'Bộ dụng cụ tỉa lông', N'GroomKit', 1200, N'Bộ tỉa lông', N'Nhật Bản', '2030-01-01', 20, 1200000, 0, 4.9, N'Bộ full kéo, lược, dao cạo', GETDATE(), 6),

-- Danh mục 7: Bánh thưởng
(N'P031', N'Bánh thưởng vị bò', N'JerHigh', 250, N'Bánh thưởng cho chó', N'Thái Lan', '2026-12-01', 50, 85000, 5, 4.8, N'Thịt bò, Omega 3, Vitamin B1', GETDATE(), 7),
(N'P032', N'Xương gặm hương gà', N'Pedigree', 300, N'Bánh thưởng cho chó', N'Mỹ', '2026-08-10', 40, 95000, 5, 4.9, N'Xương gà, Canxi', GETDATE(), 7),
(N'P033', N'Snack cá hồi', N'Catty Treats', 200, N'Bánh thưởng cho mèo', N'Canada', '2026-10-15', 30, 75000, 5, 4.7, N'Cá hồi tươi, Taurine', GETDATE(), 7),
(N'P034', N'Bánh thưởng vị cá', N'Whiskas', 180, N'Bánh thưởng cho mèo', N'Anh', '2026-09-05', 50, 65000, 5, 4.6, N'Cá ngừ, DHA', GETDATE(), 7),
(N'P035', N'Thanh thịt vị vịt', N'VetoTreat', 250, N'Bánh thưởng cho chó', N'Mỹ', '2026-07-20', 45, 90000, 5, 4.9, N'Thịt vịt tươi, bổ sung Omega', GETDATE(), 7),

-- Danh mục 8: Chăm sóc sức khỏe
(N'P036', N'Vitamin tổng hợp cho chó', N'PetVital', 100, N'Thực phẩm bổ sung', N'Mỹ', '2026-11-01', 80, 150000, 0, 4.8, N'DHA, Omega 3, Canxi', GETDATE(), 8),
(N'P037', N'Dầu cá Omega 3', N'VitaPet', 150, N'Dầu cá cho chó mèo', N'Canada', '2026-10-05', 60, 180000, 0, 4.9, N'Omega 3, Vitamin E', GETDATE(), 8),
(N'P038', N'Bột sữa dê cho mèo', N'CatMilk', 500, N'Sữa dinh dưỡng', N'Pháp', '2026-09-12', 50, 250000, 0, 4.7, N'Sữa dê, Canxi, Probiotics', GETDATE(), 8),
(N'P039', N'Gel dinh dưỡng cho chó già', N'SeniorCare', 200, N'Gel dinh dưỡng', N'Mỹ', '2026-08-18', 40, 220000, 0, 4.8, N'Glucosamine, Chondroitin', GETDATE(), 8),
(N'P040', N'Thuốc tẩy giun nội ký sinh', N'WormStop', 100, N'Thuốc tẩy giun', N'Đức', '2026-07-10', 100, 90000, 0, 4.9, N'Praziquantel, Pyrantel', GETDATE(), 8),

-- Danh mục 9: Đồ chơi
(N'P041', N'Bóng nảy chống cắn', N'ChewBall', 250, N'Bóng đồ chơi', N'Mỹ', '2030-01-01', 60, 120000, 0, 4.9, N'Cao su tự nhiên, chống vỡ', GETDATE(), 9),
(N'P042', N'Gậy chơi mèo lông vũ', N'CatFun', 150, N'Gậy chơi mèo', N'Nhật Bản', '2030-01-01', 50, 90000, 0, 4.7, N'Lông vũ mềm, cán gỗ', GETDATE(), 9),
(N'P043', N'Xương nhai phát âm thanh', N'BarkBone', 200, N'Xương đồ chơi', N'Anh', '2030-01-01', 70, 150000, 0, 4.8, N'Cao su chịu lực, phát âm thanh', GETDATE(), 9),
(N'P044', N'Mê cung đồ ăn cho chó', N'SmartDog', 500, N'Đồ chơi trí tuệ', N'Canada', '2030-01-01', 40, 300000, 0, 4.9, N'Nhựa ABS, giúp chó ăn chậm', GETDATE(), 9),
(N'P045', N'Chuột đồ chơi cho mèo', N'PetMouse', 100, N'Đồ chơi cho mèo', N'Thái Lan', '2030-01-01', 80, 60000, 0, 4.7, N'Nhựa mềm, lông giả', GETDATE(), 9),

-- Danh mục 10: Sữa tắm và vệ sinh
(N'P046', N'Sữa tắm khử mùi cho chó', N'Vetoquinol', 250, N'Sữa tắm cho chó', N'Canada', '2026-06-10', 50, 190000, 5, 4.8, N'Tinh dầu tự nhiên, dưỡng lông', GETDATE(), 10),
(N'P047', N'Nước xịt khử mùi hôi', N'PetFresh', 300, N'Xịt khử mùi', N'Anh', '2026-05-15', 70, 120000, 0, 4.7, N'Than hoạt tính, diệt khuẩn', GETDATE(), 10),
(N'P048', N'Khăn ướt vệ sinh', N'FurWipe', 500, N'Khăn ướt', N'Nhật Bản', '2027-02-01', 90, 110000, 0, 4.8, N'Lô hội, dưỡng ẩm', GETDATE(), 10),
(N'P049', N'Xịt dưỡng lông bóng mượt', N'GlowPet', 150, N'Dưỡng lông', N'Mỹ', '2026-08-20', 60, 180000, 0, 4.9, N'Tinh dầu dừa, Vitamin E', GETDATE(), 10),
(N'P050', N'Bột tắm khô', N'DryBath', 400, N'Tắm khô', N'Pháp', '2026-09-15', 40, 220000, 0, 4.8, N'Chiết xuất thiên nhiên', GETDATE(), 10),

(N'P051', N'Thức ăn hữu cơ cho mèo', N'BioCat', 1000, N'Thức ăn cho mèo', N'Mỹ',
 '2026-12-31', 40, 310000, 5, 4.7, N'Thịt hữu cơ, ngũ cốc nguyên hạt', '2025-05-07', 1),

(N'P052', N'Sữa tắm dưỡng ẩm cho chó', N'VetoClean', 300, N'Sữa tắm cho chó', N'Pháp',
 '2027-01-01', 35, 180000, 0, 4.8, N'Tinh dầu bưởi, vitamin B5', '2025-05-06', 10),

(N'P053', N'Thanh gặm bổ sung canxi', N'DentaPet', 250, N'Bánh thưởng cho chó', N'Đức',
 '2026-09-01', 50, 95000, 5, 4.9, N'Canxi, khoáng chất tự nhiên', '2025-05-05', 7),

-- Thức ăn cho mèo
(N'P054', N'Me-O Tuna Kitten Care',      N'Me-O',       800, N'Thức ăn cho mèo',      N'Thái Lan', '2026-10-10', 60, 195000, 5, 4.7, N'Cá ngừ, vitamin E, taurine',        '2025-05-10', 1),
(N'P055', N'CatCare Indoor Formula',     N'CatCare',    1000, N'Thức ăn cho mèo',      N'Hàn Quốc', '2026-11-01', 45, 265000, 7, 4.6, N'DHA, L-carnitine, protein gà',     '2025-05-10', 1),

-- Thức ăn cho chó
(N'P056', N'DogPro Premium Adult',       N'DogPro',     1200, N'Thức ăn cho chó',      N'Mỹ',       '2026-09-15', 50, 315000, 6, 4.8, N'Protein bò, omega 3, glucosamine','2025-05-10', 1),
(N'P057', N'Ganador Lamb & Rice',        N'Ganador',    1500, N'Thức ăn cho chó',      N'Tây Ban Nha','2027-01-01', 40, 430000, 8, 4.9, N'Thịt cừu, gạo, vitamin nhóm B',   '2025-05-10', 1),

-- Bánh thưởng
(N'P058', N'Snack gà mèo CatTreat',      N'CatTreats',  150, N'Bánh thưởng cho mèo',  N'Canada',   '2026-08-10', 60, 78000,  5, 4.7, N'Thịt gà tươi, taurine',           '2025-05-10', 7),
(N'P059', N'Xương sữa cuộn vị gà',       N'ChewyBone',  300, N'Bánh thưởng cho chó',  N'Thái Lan', '2026-12-01', 55, 92000,  5, 4.8, N'Canxi, xương cuộn, vị gà nướng', '2025-05-10', 7),

-- 🐱 Thức ăn cho mèo (1 sản phẩm)
(N'P060', N'CatGold Hairball Control', N'CatGold', 900, N'Thức ăn cho mèo', N'Mỹ',
 '2026-08-30', 40, 275000, 6, 4.7, N'Chất xơ tự nhiên, protein cá, omega 6', '2025-05-10', 1),

-- 🐱 Bánh thưởng cho mèo (3 sản phẩm)
(N'P061', N'Snack mèo vị cá cơm', N'KittyJoy', 180, N'Bánh thưởng cho mèo', N'Hàn Quốc',
 '2026-11-20', 45, 69000, 5, 4.6, N'Cá cơm, taurine, vitamin A', '2025-05-10', 7),

(N'P062', N'Treats mèo vị gà phô mai', N'HappyCat', 200, N'Bánh thưởng cho mèo', N'Nhật Bản',
 '2026-12-10', 55, 88000, 5, 4.8, N'Thịt gà, phô mai, canxi', '2025-05-10', 7),

(N'P063', N'Snack que mềm cho mèo', N'MeoSnack', 120, N'Bánh thưởng cho mèo', N'Thái Lan',
 '2026-10-01', 60, 62000, 5, 4.7, N'Thịt cá, vitamin E, chất xơ', '2025-05-10', 7),

-- 🐶 Thức ăn cho chó (1 sản phẩm)
(N'P064', N'SmartDog Puppy Growth', N'SmartDog', 1000, N'Thức ăn cho chó', N'Đức',
 '2026-09-10', 50, 305000, 7, 4.8, N'Canxi, DHA, protein động vật', '2025-05-10', 1),

-- 🐶 Bánh thưởng cho chó (1 sản phẩm)
(N'P065', N'Bánh thưởng vị cá hồi cho chó', N'DogTreats', 250, N'Bánh thưởng cho chó', N'Canada',
 '2026-10-15', 40, 97000, 5, 4.9, N'Cá hồi, khoáng chất, omega 3', '2025-05-10', 7);


/* Skeleton products for P001 – P050
   -------------------------------------------------------------
   - Nếu SanPham đã tồn tại, script sẽ SKIP tự động (NOT EXISTS)
   - Giá/khối lượng để 1, hạn sử dụng > 2026 để qua CHECK
   -------------------------------------------------------------*/
DECLARE @todayPlus DATE = DATEADD(YEAR, 2, GETDATE());

WITH codes AS (
    SELECT 'P001'  AS code UNION ALL SELECT 'P002'  UNION ALL SELECT 'P003'
    UNION ALL SELECT 'P004'  UNION ALL SELECT 'P005' UNION ALL SELECT 'P006'
    UNION ALL SELECT 'P007'  UNION ALL SELECT 'P008' UNION ALL SELECT 'P009'
    UNION ALL SELECT 'P010' UNION ALL SELECT 'P011' UNION ALL SELECT 'P012'
    UNION ALL SELECT 'P013' UNION ALL SELECT 'P014' UNION ALL SELECT 'P015'
    UNION ALL SELECT 'P016' UNION ALL SELECT 'P017' UNION ALL SELECT 'P019'
    UNION ALL SELECT 'P021' UNION ALL SELECT 'P023' UNION ALL SELECT 'P027'
    UNION ALL SELECT 'P031' UNION ALL SELECT 'P035' UNION ALL SELECT 'P004'
    UNION ALL SELECT 'P041' UNION ALL SELECT 'P046' UNION ALL SELECT 'P047'
    UNION ALL SELECT 'P049' UNION ALL SELECT 'P050'
)
INSERT INTO dbo.SanPham (ma_san_pham, ten_san_pham, thuong_hieu,
                         so_gram, loai, nguon_goc, han_su_dung,
                         so_luong, gia_thanh, giam_gia, danh_gia)
SELECT c.code,
       N'Sản phẩm ' + c.code,  N'BrandX',
       1,                     N'Khác', N'VN',
       @todayPlus,            0,       1,        0,        0
FROM codes c
WHERE NOT EXISTS (SELECT 1 FROM dbo.SanPham s WHERE s.ma_san_pham = c.code);
GO

/* =========================================================================
   3) NẠP DỮ LIỆU ẢNH ĐÃ UPLOAD (51 ảnh)
   =========================================================================
   - Không có metadata -> để NULL width/height/bytes
   - Ảnh đầu tiên của mỗi product => is_main = 1
   =========================================================================*/
-- P001 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     @MaSanPham = 'P001',
     @ImageUrl  = 'https://res.cloudinary.com/decwpls2n/image/upload/v1746512069/egapets/products/P001/qvhlg1xmnd6x5t0r0yck.jpg',
     @PublicId  = 'egapets/products/P001/qvhlg1xmnd6x5t0r0yck',
     @Format    = 'jpg',
     @IsMain    = 1;

EXEC dbo.usp_InsertProductImage
     'P001','https://res.cloudinary.com/decwpls2n/image/upload/v1746538845/egapets/products/P001/qppkr0fowftpulwcw7n9.jpg',
     'egapets/products/P001/qppkr0fowftpulwcw7n9','jpg';

EXEC dbo.usp_InsertProductImage
     'P001','https://res.cloudinary.com/decwpls2n/image/upload/v1746538846/egapets/products/P001/v4tyz3hekdnlx4w31oif.jpg',
     'egapets/products/P001/v4tyz3hekdnlx4w31oif','jpg';

-- P010 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P010','https://res.cloudinary.com/decwpls2n/image/upload/v1746538848/egapets/products/P0010/ciewgaufpv3ecwnckbej.jpg',
     'egapets/products/P010/ciewgaufpv3ecwnckbej','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P010','https://res.cloudinary.com/decwpls2n/image/upload/v1746538849/egapets/products/P0010/skooaxgtob5q0bemvkij.jpg',
     'egapets/products/P010/skooaxgtob5q0bemvkij','jpg';

EXEC dbo.usp_InsertProductImage
     'P010','https://res.cloudinary.com/decwpls2n/image/upload/v1746538850/egapets/products/P0010/t8otfvdzslnbch2uwavi.jpg',
     'egapets/products/P010/t8otfvdzslnbch2uwavi','jpg';

-- P0011 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P011','https://res.cloudinary.com/decwpls2n/image/upload/v1746538852/egapets/products/P0011/g3gpsi2dgjwlklw6vvox.jpg',
     'egapets/products/P011/g3gpsi2dgjwlklw6vvox','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P011','https://res.cloudinary.com/decwpls2n/image/upload/v1746538853/egapets/products/P0011/uaksen8wfsb4jjwy2gof.jpg',
     'egapets/products/P011/uaksen8wfsb4jjwy2gof','jpg';

-- P0012 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P012','https://res.cloudinary.com/decwpls2n/image/upload/v1746538854/egapets/products/P0012/qcy8inplayuuiw1g67bf.jpg',
     'egapets/products/P012/qcy8inplayuuiw1g67bf','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P012','https://res.cloudinary.com/decwpls2n/image/upload/v1746538856/egapets/products/P0012/ewov2iuf2jfch4hdhtxp.jpg',
     'egapets/products/P012/ewov2iuf2jfch4hdhtxp','jpg';

EXEC dbo.usp_InsertProductImage
     'P012','https://res.cloudinary.com/decwpls2n/image/upload/v1746538857/egapets/products/P0012/mfseqcextajlkajyaxhu.jpg',
     'egapets/products/P012/mfseqcextajlkajyaxhu','jpg';

-- P0013 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P013','https://res.cloudinary.com/decwpls2n/image/upload/v1746538859/egapets/products/P0013/k0cmitowg2ygwmpuus62.jpg',
     'egapets/products/P013/k0cmitowg2ygwmpuus62','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P013','https://res.cloudinary.com/decwpls2n/image/upload/v1746538860/egapets/products/P0013/niiemsyfq6vkwpewusot.jpg',
     'egapets/products/P0013/niiemsyfq6vkwpewusot','jpg';

EXEC dbo.usp_InsertProductImage
     'P013','https://res.cloudinary.com/decwpls2n/image/upload/v1746538861/egapets/products/P0013/xwln5hnmz1tp9ck9tzxe.jpg',
     'egapets/products/P013/xwln5hnmz1tp9ck9tzxe','jpg';

-- P0014 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P014','https://res.cloudinary.com/decwpls2n/image/upload/v1746538862/egapets/products/P0014/hj03grrqleqr0uy6byav.jpg',
     'egapets/products/P014/hj03grrqleqr0uy6byav','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P014','https://res.cloudinary.com/decwpls2n/image/upload/v1746538863/egapets/products/P0014/bgc3duq9pphrhmrjmzq6.jpg',
     'egapets/products/P014/bgc3duq9pphrhmrjmzq6','jpg';

-- P0015 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P015','https://res.cloudinary.com/decwpls2n/image/upload/v1746538864/egapets/products/P0015/vchljvza8eh6uz71pqpa.jpg',
     'egapets/products/P015/vchljvza8eh6uz71pqpa','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P015','https://res.cloudinary.com/decwpls2n/image/upload/v1746538866/egapets/products/P0015/dy3xajvdx67ysuuo6aov.jpg',
     'egapets/products/P015/dy3xajvdx67ysuuo6aov','jpg';

-- P0016 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P016','https://res.cloudinary.com/decwpls2n/image/upload/v1746538867/egapets/products/P0016/wh2kbppbwunfomrxzpms.jpg',
     'egapets/products/P016/wh2kbppbwunfomrxzpms','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P016','https://res.cloudinary.com/decwpls2n/image/upload/v1746538868/egapets/products/P0016/ugxptjf1ds5rlfc4wkzl.jpg',
     'egapets/products/P016/ugxptjf1ds5rlfc4wkzl','jpg';

-- P0017 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P017','https://res.cloudinary.com/decwpls2n/image/upload/v1746538870/egapets/products/P0017/b1aq02kcdjid4ld6auqb.jpg',
     'egapets/products/P017/b1aq02kcdjid4ld6auqb','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P017','https://res.cloudinary.com/decwpls2n/image/upload/v1746538871/egapets/products/P0017/doxjdf0qkrpdvazzi6ht.jpg',
     'egapets/products/P017/doxjdf0qkrpdvazzi6ht','jpg';

-- P0019 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P019','https://res.cloudinary.com/decwpls2n/image/upload/v1746538872/egapets/products/P0019/bxy48ztsm5piiv1oelhf.jpg',
     'egapets/products/P019/bxy48ztsm5piiv1oelhf','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P019','https://res.cloudinary.com/decwpls2n/image/upload/v1746538873/egapets/products/P0019/xofwvdlnxo8e5bteoxt4.jpg',
     'egapets/products/P019/xofwvdlnxo8e5bteoxt4','jpg';

-- P002 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P002','https://res.cloudinary.com/decwpls2n/image/upload/v1746538875/egapets/products/P002/gq9scdzu7j2iquywdtm2.jpg',
     'egapets/products/P002/gq9scdzu7j2iquywdtm2','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P002','https://res.cloudinary.com/decwpls2n/image/upload/v1746538880/egapets/products/P002/x7ffq2hyvxcxsoog6jid.jpg',
     'egapets/products/P002/x7ffq2hyvxcxsoog6jid','jpg';

EXEC dbo.usp_InsertProductImage
     'P002','https://res.cloudinary.com/decwpls2n/image/upload/v1746538886/egapets/products/P002/v5qrpbjgkpiyqi0rppzc.jpg',
     'egapets/products/P002/v5qrpbjgkpiyqi0rppzc','jpg';

-- P0021 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P021','https://res.cloudinary.com/decwpls2n/image/upload/v1746538887/egapets/products/P0021/mhzhegfb95vtnbjualql.jpg',
     'egapets/products/P021/mhzhegfb95vtnbjualql','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P021','https://res.cloudinary.com/decwpls2n/image/upload/v1746538888/egapets/products/P0021/b8b7a4miihiw7uvawxf5.jpg',
     'egapets/products/P021/b8b7a4miihiw7uvawxf5.jpg','jpg';

-- P0023 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P023','https://res.cloudinary.com/decwpls2n/image/upload/v1746538889/egapets/products/P0023/vyazejcaysbhbosy2wt8.jpg',
     'egapets/products/P023/vyazejcaysbhbosy2wt8','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P023','https://res.cloudinary.com/decwpls2n/image/upload/v1746538890/egapets/products/P0023/vd5iz6wlnkqtsznzk10i.jpg',
     'egapets/products/P023/vd5iz6wlnkqtsznzk10i','jpg';

-- P0027 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P027','https://res.cloudinary.com/decwpls2n/image/upload/v1746538892/egapets/products/P0027/dbdl47tqucxb5mmdpkwg.jpg',
     'egapets/products/P0027/dbdl47tqucxb5mmdpkwg','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P027','https://res.cloudinary.com/decwpls2n/image/upload/v1746538893/egapets/products/P0027/jn7grn4wjgouuafoo5rz.jpg',
     'egapets/products/P027/jn7grn4wjgouuafoo5rz','jpg';

-- P003 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P003','https://res.cloudinary.com/decwpls2n/image/upload/v1746538894/egapets/products/P003/pmwwnbcquc3racntfi6u.jpg',
     'egapets/products/P003/pmwwnbcquc3racntfi6u','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P003','https://res.cloudinary.com/decwpls2n/image/upload/v1746538895/egapets/products/P003/v58c1smlatsxnpnmk8s9.jpg',
     'egapets/products/P003/v58c1smlatsxnpnmk8s9','jpg';

EXEC dbo.usp_InsertProductImage
     'P003','https://res.cloudinary.com/decwpls2n/image/upload/v1746538897/egapets/products/P003/voqjph6ygfmjq4znekgi.jpg',
     'egapets/products/P003/voqjph6ygfmjq4znekgi','jpg';

EXEC dbo.usp_InsertProductImage
     'P003','https://res.cloudinary.com/decwpls2n/image/upload/v1746538898/egapets/products/P003/cvdrlv3ydlqpkq0pi9im.jpg',
     'egapets/products/P003/cvdrlv3ydlqpkq0pi9im','jpg';

-- P0031 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P031','https://res.cloudinary.com/decwpls2n/image/upload/v1746538900/egapets/products/P0031/ehmgyk2htxkbi4ulnejm.jpg',
     'egapets/products/P031/ehmgyk2htxkbi4ulnejm','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P031','https://res.cloudinary.com/decwpls2n/image/upload/v1746538901/egapets/products/P0031/wit3p0lvnddjs89y7phy.jpg',
     'egapets/products/P031/wit3p0lvnddjs89y7phy','jpg';

-- P0035 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P035','https://res.cloudinary.com/decwpls2n/image/upload/v1746538902/egapets/products/P0035/oqbd9wzxsbynuls5njor.jpg',
     'egapets/products/P035/oqbd9wzxsbynuls5njor','jpg', @IsMain = 1;

-- P004 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P004','https://res.cloudinary.com/decwpls2n/image/upload/v1746538903/egapets/products/P004/q6kqskm0ltihp8pc4fps.jpg',
     'egapets/products/P004/q6kqskm0ltihp8pc4fps','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P004','https://res.cloudinary.com/decwpls2n/image/upload/v1746538904/egapets/products/P004/upoiwt1nopa4odu2b9h6.jpg',
     'egapets/products/P004/upoiwt1nopa4odu2b9h6','jpg';

EXEC dbo.usp_InsertProductImage
     'P004','https://res.cloudinary.com/decwpls2n/image/upload/v1746538906/egapets/products/P004/bnsjropv1u5qdk2zgkah.jpg',
     'egapets/products/P004/bnsjropv1u5qdk2zgkah','jpg';

-- P0041 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P041','https://res.cloudinary.com/decwpls2n/image/upload/v1746538907/egapets/products/P0041/uegkzmqe8j2mproh1oqi.jpg',
     'egapets/products/0041/uegkzmqe8j2mproh1oqi','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P041','https://res.cloudinary.com/decwpls2n/image/upload/v1746538909/egapets/products/P0041/jtflepe0x51wq7o2ilxc.jpg',
     'egapets/products/P041/jtflepe0x51wq7o2ilxc','jpg';

-- P0046 --------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P046','https://res.cloudinary.com/decwpls2n/image/upload/v1746538910/egapets/products/P0046/ojciipqpnk3waovg67pn.jpg',
     'egapets/products/P046/ojciipqpnk3waovg67pn','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P046','https://res.cloudinary.com/decwpls2n/image/upload/v1746538911/egapets/products/P0046/y1ycryaro3sdx9ziw86x.jpg',
     'egapets/products/P046/y1ycryaro3sdx9ziw86x','jpg';

-- P005 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P005','https://res.cloudinary.com/decwpls2n/image/upload/v1746538913/egapets/products/P005/wutjgkplmmzh4a0pydwj.jpg',
     'egapets/products/P005/wutjgkplmmzh4a0pydwj','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P005','https://res.cloudinary.com/decwpls2n/image/upload/v1746538914/egapets/products/P005/w6xu3elniazjqj6hxotm.jpg',
     'egapets/products/P005/w6xu3elniazjqj6hxotm','jpg';

EXEC dbo.usp_InsertProductImage
     'P005','https://res.cloudinary.com/decwpls2n/image/upload/v1746538916/egapets/products/P005/raaz0vcokwg4opzqrd1a.jpg',
     'egapets/products/P005/raaz0vcokwg4opzqrd1a','jpg';

-- P006 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P006','https://res.cloudinary.com/decwpls2n/image/upload/v1746538917/egapets/products/P006/pv2jdnmiox1rp0qc4riq.jpg',
     'egapets/products/P006/pv2jdnmiox1rp0qc4riq','jpg', @IsMain = 1;

-- P007 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P007','https://res.cloudinary.com/decwpls2n/image/upload/v1746538918/egapets/products/P007/eb1xp5jehmmitkgu29hn.jpg',
     'egapets/products/P007/eb1xp5jehmmitkgu29hn','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P007','https://res.cloudinary.com/decwpls2n/image/upload/v1746538919/egapets/products/P007/i8clt33sxb8xgagvgnjw.jpg',
     'egapets/products/P007/i8clt33sxb8xgagvgnjw','jpg';

-- P008 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P008','https://res.cloudinary.com/decwpls2n/image/upload/v1746538921/egapets/products/P008/fldz160a7zokyfcrco8h.jpg',
     'egapets/products/P008/fldz160a7zokyfcrco8h','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P008','https://res.cloudinary.com/decwpls2n/image/upload/v1746538922/egapets/products/P008/uuncuhlbfxqyxzkw0sas.jpg',
     'egapets/products/P008/uuncuhlbfxqyxzkw0sas','jpg';

-- P009 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P009','https://res.cloudinary.com/decwpls2n/image/upload/v1746538923/egapets/products/P009/awb9zdfhp6pit94eiyhc.jpg',
     'egapets/products/P009/awb9zdfhp6pit94eiyhc','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P009','https://res.cloudinary.com/decwpls2n/image/upload/v1746538924/egapets/products/P009/e0zghzxn3xpeiqmgspqq.jpg',
     'egapets/products/P009/e0zghzxn3xpeiqmgspqq','jpg';

-- P047 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P047','https://res.cloudinary.com/decwpls2n/image/upload/v1746538926/egapets/products/P047/x4jt6k62xbbzn3rigqex.jpg',
     'egapets/products/P047/x4jt6k62xbbzn3rigqex','jpg', @IsMain = 1;

-- P049 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P049','https://res.cloudinary.com/decwpls2n/image/upload/v1746538927/egapets/products/P049/ykqu9rkemngcx5hs5ink.jpg',
     'egapets/products/P049/ykqu9rkemngcx5hs5ink','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P049','https://res.cloudinary.com/decwpls2n/image/upload/v1746538928/egapets/products/P049/aywp2im6zkxfhulfrlqw.jpg',
     'egapets/products/P049/aywp2im6zkxfhulfrlqw','jpg';

-- P050 ---------------------------------------------------------------------
EXEC dbo.usp_InsertProductImage
     'P050','https://res.cloudinary.com/decwpls2n/image/upload/v1746538930/egapets/products/P050/hrree1pf7gywtthkwrkr.jpg',
     'egapets/products/P050/hrree1pf7gywtthkwrkr','jpg', @IsMain = 1;

EXEC dbo.usp_InsertProductImage
     'P050','https://res.cloudinary.com/decwpls2n/image/upload/v1746538931/egapets/products/P050/rdp4tiv5gcrtn9fulv53.jpg',
     'egapets/products/P050/rdp4tiv5gcrtn9fulv53','jpg';

PRINT N'Đã tạo bảng SanPhamAnh, thủ tục và nạp 51 ảnh thành công!';
GO

-- ─────────────────────────────────────────────────────────────────────────
-- Data Users, KhachHang, NhanVien
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO Users (username, password_hash, role, email)
VALUES 
   (N'adminAccount',
    HASHBYTES('SHA2_256', 'AdminPassword123'),
    N'Admin',
    N'admin@egapets.com'),
    
   (N'employeeAccount',
    HASHBYTES('SHA2_256', 'EmployeePassword456'),
    N'NhanVien',
    N'employee@egapets.com'),
    
   (N'customerAccount',
    HASHBYTES('SHA2_256', 'CustomerPassword789'),
    N'KhachHang',
    N'customer@egapets.com');


---------------------------------------------
-- Tạo profile (hồ sơ) cho user NhanVien
---------------------------------------------
DECLARE @NhanVienUserId INT;
SET @NhanVienUserId = (SELECT id FROM Users WHERE username = N'employeeAccount');

INSERT INTO NhanVien (
   user_id,
   ho_ten,
   so_dien_thoai,
   ngay_sinh,
   dia_chi,
   chuc_vu,
   luong
)
VALUES
(
   @NhanVienUserId,
   N'Nguyễn Văn A',         -- Họ tên nhân viên
   N'0123456789',           -- Số điện thoại
   '1990-01-01',            -- Ngày sinh
   N'123 Đường ABC, Hà Nội',
   N'Nhân viên bán hàng',   -- Kiểm tra ràng buộc chuc_vu
   7000000                  -- Lương
);


---------------------------------------------
-- Tạo profile (hồ sơ) cho user Khách Hàng
---------------------------------------------
DECLARE @KhachHangUserId INT;
SET @KhachHangUserId = (SELECT id FROM Users WHERE username = N'customerAccount');

INSERT INTO KhachHang (
   user_id,
   ho_ten,
   so_dien_thoai,
   ngay_sinh,
   dia_chi,
   tinh_thanh,
   quan_huyen,
   phuong_xa
)
VALUES
(
   @KhachHangUserId,
   N'Trần Thị B',            -- Họ tên khách hàng
   N'0987654321',            -- Số điện thoại
   '1995-05-10',             -- Ngày sinh
   N'Số 456, Đường XYZ', 
   N'Hà Nội', 
   N'Đống Đa', 
   N'Láng Hạ'
);

-- ─────────────────────────────────────────────────────────────────────────
-- Data DichVu
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO DichVu (ten_dich_vu, mo_ta, gia_mac_dinh) VALUES
(N'Tắm rửa cho chó', N'Dịch vụ tắm sạch sẽ, khử mùi và dưỡng lông cho chó.', 100000),
(N'Tắm rửa cho mèo', N'Dịch vụ tắm dành riêng cho mèo, sử dụng dầu tắm chuyên dụng.', 120000),
(N'Cắt tỉa lông chó', N'Tạo kiểu, cắt lông theo yêu cầu cho thú cưng.', 150000),
(N'Cắt tỉa lông mèo', N'Tạo kiểu, cắt lông theo yêu cầu dành riêng cho mèo.', 130000),
(N'Vệ sinh tai', N'Vệ sinh sạch sẽ tai thú cưng, ngăn ngừa nhiễm trùng.', 50000),
(N'Cắt móng', N'Cắt móng an toàn, tránh thú cưng bị thương do móng dài.', 40000),
(N'Trọn gói spa chó', N'Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.', 250000),
(N'Trọn gói spa mèo', N'Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.', 230000);
GO
-- ─────────────────────────────────────────────────────────────────────────
-- Data DichVuChiTiet
-- ─────────────────────────────────────────────────────────────────────────

INSERT INTO DichVuChiTiet (dich_vu_id, can_nang, loai_long, gia) VALUES
-- Tắm rửa cho chó
(1, N'<3kg', N'Ngắn', 80000),
(1, N'<3kg', N'Dài', 90000),
(1, N'3-5kg', N'Ngắn', 100000),
(1, N'3-5kg', N'Dài', 110000),
(1, N'5-10kg', N'Ngắn', 120000),
(1, N'5-10kg', N'Dài', 130000),
(1, N'10-20kg', N'Ngắn', 150000),
(1, N'10-20kg', N'Dài', 170000),
(1, N'>20kg', N'Ngắn', 200000),
(1, N'>20kg', N'Dài', 220000),

-- Tắm rửa cho mèo
(2, N'<3kg', N'Ngắn', 100000),
(2, N'<3kg', N'Dài', 110000),
(2, N'3-5kg', N'Ngắn', 120000),
(2, N'3-5kg', N'Dài', 130000),
(2, N'5-10kg', N'Ngắn', 140000),
(2, N'5-10kg', N'Dài', 150000),

-- Cắt tỉa lông chó
(3, N'<3kg', N'Ngắn', 120000),
(3, N'<3kg', N'Dài', 130000),
(3, N'3-5kg', N'Ngắn', 140000),
(3, N'3-5kg', N'Dài', 150000),
(3, N'5-10kg', N'Ngắn', 160000),
(3, N'5-10kg', N'Dài', 170000),

-- Cắt tỉa lông mèo
(4, N'<3kg', N'Ngắn', 110000),
(4, N'<3kg', N'Dài', 120000),
(4, N'3-5kg', N'Ngắn', 130000),
(4, N'3-5kg', N'Dài', 140000),

-- Vệ sinh tai
(5, N'<3kg', N'Ngắn', 50000),
(5, N'<3kg', N'Dài', 50000),
(5, N'3-5kg', N'Ngắn', 60000),
(5, N'3-5kg', N'Dài', 60000),

-- Cắt móng
(6, N'<3kg', N'Ngắn', 40000),
(6, N'<3kg', N'Dài', 40000),
(6, N'3-5kg', N'Ngắn', 50000),
(6, N'3-5kg', N'Dài', 50000),

-- Trọn gói spa chó
(7, N'<3kg', N'Ngắn', 220000),
(7, N'<3kg', N'Dài', 230000),
(7, N'3-5kg', N'Ngắn', 250000),
(7, N'3-5kg', N'Dài', 260000),

-- Trọn gói spa mèo
(8, N'<3kg', N'Ngắn', 200000),
(8, N'<3kg', N'Dài', 210000),
(8, N'3-5kg', N'Ngắn', 220000),
(8, N'3-5kg', N'Dài', 230000);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- Data PhuongThucThanhToan
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO PhuongThucThanhToan (ten_phuong_thuc) 
VALUES 
(N'Chuyển khoản Momo'),
(N'Chuyển khoản Ngân hàng');
GO
