-- PostgreSQL Data Script for EgaPets
-- Converted from SQL Server to PostgreSQL

-- Connect to the database
\c egapets_db;

-- ─────────────────────────────────────────────────────────────────────────
-- Data DanhMucSanPham
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO DanhMucSanPham (ten_danh_muc) VALUES
('Thức ăn cho thú cưng'),
('Đồ dùng tỉa lông'),
('Nhà vệ sinh'),
('Phụ kiện'),
('Đệm - Giường'),
('Dụng cụ chải lông'),
('Bánh thưởng'),
('Chăm sóc sức khỏe'),
('Đồ chơi'),
('Sữa tắm và vệ sinh');

-- ─────────────────────────────────────────────────────────────────────────
-- Data SanPham
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO SanPham (ma_san_pham, ten_san_pham, thuong_hieu, so_gram, loai, nguon_goc, han_su_dung, so_luong, gia_thanh, giam_gia, danh_gia, thanh_phan, created_at, danh_muc_id)
VALUES
-- Danh mục 1: Thức ăn cho thú cưng
('P001', 'Royal Canin Medium Puppy', 'Royal Canin', 1000, 'Thức ăn cho chó', 'Pháp', '2026-05-15', 50, 350000, 10, 4.8, 'Protein, Vitamin E, DHA, Omega 3', CURRENT_DATE, 1),
('P002', 'Pedigree Adult Beef', 'Pedigree', 1200, 'Thức ăn cho chó', 'Mỹ', '2025-10-20', 30, 290000, 5, 4.5, 'Thịt bò, Canxi, Chất xơ', CURRENT_DATE, 1),
('P003', 'Whiskas Tuna Kitten', 'Whiskas', 500, 'Thức ăn cho mèo', 'Thái Lan', '2025-07-10', 40, 180000, 8, 4.7, 'Cá ngừ, Vitamin A, Taurine', CURRENT_DATE, 1),
('P004', 'Ganador Salmon Adult', 'Ganador', 1500, 'Thức ăn cho chó', 'Tây Ban Nha', '2025-12-12', 60, 420000, 12, 4.6, 'Cá hồi, Omega 6, Chất đạm', CURRENT_DATE, 1),
('P005', 'Me-O Chicken', 'Me-O', 800, 'Thức ăn cho mèo', 'Thái Lan', '2026-02-28', 55, 220000, 6, 4.4, 'Thịt gà, Taurine, Kẽm', CURRENT_DATE, 1),

-- Danh mục 2: Đồ dùng tỉa lông
('P006', 'Kéo cắt lông cao cấp', 'Pet Groom', 250, 'Kéo cắt lông', 'Nhật Bản', '2030-01-01', 20, 450000, 0, 4.7, 'Thép không gỉ, Bọc cao su chống trượt', CURRENT_DATE, 2),
('P007', 'Lược chải lông 2in1', 'FurMagic', 150, 'Lược chải lông', 'Anh', '2030-01-01', 30, 250000, 0, 4.8, 'Lược kim loại + cao su', CURRENT_DATE, 2),
('P008', 'Bộ cắt lông điện không dây', 'Wahl', 500, 'Máy cắt lông', 'Mỹ', '2030-01-01', 15, 1200000, 5, 4.9, 'Pin sạc, lưỡi titan', CURRENT_DATE, 2),
('P009', 'Lược gỡ rối cho chó mèo', 'Tangle-Free', 180, 'Lược gỡ rối', 'Pháp', '2030-01-01', 50, 300000, 0, 4.6, 'Răng silicon mềm mại', CURRENT_DATE, 2),
('P010', 'Găng tay chải lông', 'PetEasy', 200, 'Găng tay chải lông', 'Thái Lan', '2030-01-01', 60, 180000, 0, 4.7, 'Silicone cao cấp', CURRENT_DATE, 2),

-- Danh mục 3: Nhà vệ sinh
('P011', 'Nhà vệ sinh tự động', 'CatGenie', 5000, 'Nhà vệ sinh cho mèo', 'Mỹ', '2030-01-01', 10, 5000000, 5, 4.9, 'Công nghệ tự rửa, không mùi', CURRENT_DATE, 3),
('P012', 'Cát vệ sinh hữu cơ', 'Biokat', 10000, 'Cát vệ sinh', 'Đức', '2027-01-01', 200, 300000, 0, 4.7, 'Than hoạt tính, khử mùi', CURRENT_DATE, 3),
('P013', 'Khay vệ sinh cho chó', 'DogPotty', 1500, 'Khay vệ sinh', 'Hàn Quốc', '2030-01-01', 30, 450000, 0, 4.8, 'Nhựa cao cấp, dễ vệ sinh', CURRENT_DATE, 3),
('P014', 'Bộ lọc khử mùi nhà vệ sinh', 'FreshPet', 200, 'Bộ lọc khử mùi', 'Nhật Bản', '2027-01-01', 40, 100000, 0, 4.6, 'Lọc than hoạt tính', CURRENT_DATE, 3),
('P015', 'Thảm lau chân chống dính cát', 'PetComfort', 1000, 'Thảm vệ sinh', 'Mỹ', '2030-01-01', 50, 250000, 0, 4.8, 'Sợi microfiber, dễ giặt', CURRENT_DATE, 3),

-- Danh mục 4: Phụ kiện
('P016', 'Vòng cổ LED chống lạc', 'GlowPet', 150, 'Vòng cổ', 'Anh', '2030-01-01', 80, 200000, 0, 4.9, 'Chống nước, sáng trong đêm', CURRENT_DATE, 4),
('P017', 'Dây dắt chó kéo dài', 'Flexi', 300, 'Dây dắt', 'Đức', '2030-01-01', 100, 450000, 0, 4.7, 'Dây rút tự động, chịu lực cao', CURRENT_DATE, 4),
('P018', 'Áo khoác chống lạnh', 'WinterPet', 400, 'Áo cho thú cưng', 'Canada', '2030-01-01', 50, 350000, 0, 4.8, 'Vải len giữ nhiệt', CURRENT_DATE, 4),
('P019', 'Balo vận chuyển chó mèo', 'TravelPet', 2000, 'Balo vận chuyển', 'Mỹ', '2030-01-01', 40, 650000, 0, 4.9, 'Lưới thoáng khí, chống sốc', CURRENT_DATE, 4),
('P020', 'Giường ngủ êm ái', 'ComfortNest', 3000, 'Giường thú cưng', 'Thái Lan', '2030-01-01', 30, 900000, 0, 4.8, 'Đệm bông mềm, vỏ tháo giặt', CURRENT_DATE, 4),

-- Danh mục 5: Đệm - Giường
('P021', 'Đệm êm ái cho thú cưng', 'CozyPet', 2000, 'Đệm ngủ', 'Việt Nam', '2030-01-01', 30, 500000, 0, 4.9, 'Bông mềm, chống nước', CURRENT_DATE, 5),
('P022', 'Giường gỗ cao cấp', 'PetLuxury', 3000, 'Giường gỗ', 'Canada', '2030-01-01', 20, 1200000, 0, 4.8, 'Gỗ sồi, đệm bông', CURRENT_DATE, 5),
('P023', 'Chăn ấm cho mèo', 'FurryComfort', 1000, 'Chăn cho thú cưng', 'Mỹ', '2030-01-01', 50, 350000, 0, 4.7, 'Vải len giữ nhiệt', CURRENT_DATE, 5),
('P024', 'Nệm cao su cho chó lớn', 'PawSoft', 4000, 'Nệm cao su', 'Anh', '2030-01-01', 25, 950000, 0, 4.9, 'Cao su thiên nhiên, chống trượt', CURRENT_DATE, 5),
('P025', 'Gối nằm êm ái', 'ComfyPet', 800, 'Gối thú cưng', 'Nhật Bản', '2030-01-01', 40, 150000, 0, 4.7, 'Bông gòn cao cấp', CURRENT_DATE, 5),

-- Danh mục 6: Dụng cụ chải lông
('P026', 'Bàn chải lông mềm', 'FurCare', 200, 'Bàn chải lông', 'Pháp', '2030-01-01', 60, 180000, 0, 4.8, 'Lông mềm, tay cầm chống trượt', CURRENT_DATE, 6),
('P027', 'Lược chải lông hai mặt', 'FurryEase', 250, 'Lược chải lông', 'Mỹ', '2030-01-01', 50, 250000, 0, 4.9, 'Răng thép không gỉ + chải cao su', CURRENT_DATE, 6),
('P028', 'Kéo tỉa lông chuyên nghiệp', 'PetGroom', 300, 'Kéo tỉa lông', 'Anh', '2030-01-01', 40, 600000, 0, 4.8, 'Thép Nhật, siêu sắc', CURRENT_DATE, 6),
('P029', 'Găng tay chải lông', 'PetHandy', 150, 'Găng tay chải lông', 'Thái Lan', '2030-01-01', 100, 160000, 0, 4.7, 'Silicone mềm, dễ vệ sinh', CURRENT_DATE, 6),
('P030', 'Bộ dụng cụ tỉa lông', 'GroomKit', 1200, 'Bộ tỉa lông', 'Nhật Bản', '2030-01-01', 20, 1200000, 0, 4.9, 'Bộ full kéo, lược, dao cạo', CURRENT_DATE, 6),

-- Danh mục 7: Bánh thưởng
('P031', 'Bánh thưởng vị bò', 'JerHigh', 250, 'Bánh thưởng cho chó', 'Thái Lan', '2026-12-01', 50, 85000, 5, 4.8, 'Thịt bò, Omega 3, Vitamin B1', CURRENT_DATE, 7),
('P032', 'Xương gặm hương gà', 'Pedigree', 300, 'Bánh thưởng cho chó', 'Mỹ', '2026-08-10', 40, 95000, 5, 4.9, 'Xương gà, Canxi', CURRENT_DATE, 7),
('P033', 'Snack cá hồi', 'Catty Treats', 200, 'Bánh thưởng cho mèo', 'Canada', '2026-10-15', 30, 75000, 5, 4.7, 'Cá hồi tươi, Taurine', CURRENT_DATE, 7),
('P034', 'Bánh thưởng vị cá', 'Whiskas', 180, 'Bánh thưởng cho mèo', 'Anh', '2026-09-05', 50, 65000, 5, 4.6, 'Cá ngừ, DHA', CURRENT_DATE, 7),
('P035', 'Thanh thịt vị vịt', 'VetoTreat', 250, 'Bánh thưởng cho chó', 'Mỹ', '2026-07-20', 45, 90000, 5, 4.9, 'Thịt vịt tươi, bổ sung Omega', CURRENT_DATE, 7),

-- Danh mục 8: Chăm sóc sức khỏe
('P036', 'Vitamin tổng hợp cho chó', 'PetVital', 100, 'Thực phẩm bổ sung', 'Mỹ', '2026-11-01', 80, 150000, 0, 4.8, 'DHA, Omega 3, Canxi', CURRENT_DATE, 8),
('P037', 'Dầu cá Omega 3', 'VitaPet', 150, 'Dầu cá cho chó mèo', 'Canada', '2026-10-05', 60, 180000, 0, 4.9, 'Omega 3, Vitamin E', CURRENT_DATE, 8),
('P038', 'Bột sữa dê cho mèo', 'CatMilk', 500, 'Sữa dinh dưỡng', 'Pháp', '2026-09-12', 50, 250000, 0, 4.7, 'Sữa dê, Canxi, Probiotics', CURRENT_DATE, 8),
('P039', 'Gel dinh dưỡng cho chó già', 'SeniorCare', 200, 'Gel dinh dưỡng', 'Mỹ', '2026-08-18', 40, 220000, 0, 4.8, 'Glucosamine, Chondroitin', CURRENT_DATE, 8),
('P040', 'Thuốc tẩy giun nội ký sinh', 'WormStop', 100, 'Thuốc tẩy giun', 'Đức', '2026-07-10', 100, 90000, 0, 4.9, 'Praziquantel, Pyrantel', CURRENT_DATE, 8),

-- Danh mục 9: Đồ chơi
('P041', 'Bóng nảy chống cắn', 'ChewBall', 250, 'Bóng đồ chơi', 'Mỹ', '2030-01-01', 60, 120000, 0, 4.9, 'Cao su tự nhiên, chống vỡ', CURRENT_DATE, 9),
('P042', 'Gậy chơi mèo lông vũ', 'CatFun', 150, 'Gậy chơi mèo', 'Nhật Bản', '2030-01-01', 50, 90000, 0, 4.7, 'Lông vũ mềm, cán gỗ', CURRENT_DATE, 9),
('P043', 'Xương nhai phát âm thanh', 'BarkBone', 200, 'Xương đồ chơi', 'Anh', '2030-01-01', 70, 150000, 0, 4.8, 'Cao su chịu lực, phát âm thanh', CURRENT_DATE, 9),
('P044', 'Mê cung đồ ăn cho chó', 'SmartDog', 500, 'Đồ chơi trí tuệ', 'Canada', '2030-01-01', 40, 300000, 0, 4.9, 'Nhựa ABS, giúp chó ăn chậm', CURRENT_DATE, 9),
('P045', 'Chuột đồ chơi cho mèo', 'PetMouse', 100, 'Đồ chơi cho mèo', 'Thái Lan', '2030-01-01', 80, 60000, 0, 4.7, 'Nhựa mềm, lông giả', CURRENT_DATE, 9),

-- Danh mục 10: Sữa tắm và vệ sinh
('P046', 'Sữa tắm khử mùi cho chó', 'Vetoquinol', 250, 'Sữa tắm cho chó', 'Canada', '2026-06-10', 50, 190000, 5, 4.8, 'Tinh dầu tự nhiên, dưỡng lông', CURRENT_DATE, 10),
('P047', 'Nước xịt khử mùi hôi', 'PetFresh', 300, 'Xịt khử mùi', 'Anh', '2026-05-15', 70, 120000, 0, 4.7, 'Than hoạt tính, diệt khuẩn', CURRENT_DATE, 10),
('P048', 'Khăn ướt vệ sinh', 'FurWipe', 500, 'Khăn ướt', 'Nhật Bản', '2027-02-01', 90, 110000, 0, 4.8, 'Lô hội, dưỡng ẩm', CURRENT_DATE, 10),
('P049', 'Xịt dưỡng lông bóng mượt', 'GlowPet', 150, 'Dưỡng lông', 'Mỹ', '2026-08-20', 60, 180000, 0, 4.9, 'Tinh dầu dừa, Vitamin E', CURRENT_DATE, 10),
('P050', 'Bột tắm khô', 'DryBath', 400, 'Tắm khô', 'Pháp', '2026-09-15', 40, 220000, 0, 4.8, 'Chiết xuất thiên nhiên', CURRENT_DATE, 10),

-- Additional products
('P051', 'Thức ăn hữu cơ cho mèo', 'BioCat', 1000, 'Thức ăn cho mèo', 'Mỹ', '2026-12-31', 40, 310000, 5, 4.7, 'Thịt hữu cơ, ngũ cốc nguyên hạt', '2025-05-07', 1),
('P052', 'Sữa tắm dưỡng ẩm cho chó', 'VetoClean', 300, 'Sữa tắm cho chó', 'Pháp', '2027-01-01', 35, 180000, 0, 4.8, 'Tinh dầu bưởi, vitamin B5', '2025-05-06', 10),
('P053', 'Thanh gặm bổ sung canxi', 'DentaPet', 250, 'Bánh thưởng cho chó', 'Đức', '2026-09-01', 50, 95000, 5, 4.9, 'Canxi, khoáng chất tự nhiên', '2025-05-05', 7),
('P054', 'Me-O Tuna Kitten Care', 'Me-O', 800, 'Thức ăn cho mèo', 'Thái Lan', '2026-10-10', 60, 195000, 5, 4.7, 'Cá ngừ, vitamin E, taurine', '2025-05-10', 1),
('P055', 'CatCare Indoor Formula', 'CatCare', 1000, 'Thức ăn cho mèo', 'Hàn Quốc', '2026-11-01', 45, 265000, 7, 4.6, 'DHA, L-carnitine, protein gà', '2025-05-10', 1),
('P056', 'DogPro Premium Adult', 'DogPro', 1200, 'Thức ăn cho chó', 'Mỹ', '2026-09-15', 50, 315000, 6, 4.8, 'Protein bò, omega 3, glucosamine', '2025-05-10', 1),
('P057', 'Ganador Lamb & Rice', 'Ganador', 1500, 'Thức ăn cho chó', 'Tây Ban Nha', '2027-01-01', 40, 430000, 8, 4.9, 'Thịt cừu, gạo, vitamin nhóm B', '2025-05-10', 1),
('P058', 'Snack gà mèo CatTreat', 'CatTreats', 150, 'Bánh thưởng cho mèo', 'Canada', '2026-08-10', 60, 78000, 5, 4.7, 'Thịt gà tươi, taurine', '2025-05-10', 7),
('P059', 'Xương sữa cuộn vị gà', 'ChewyBone', 300, 'Bánh thưởng cho chó', 'Thái Lan', '2026-12-01', 55, 92000, 5, 4.8, 'Canxi, xương cuộn, vị gà nướng', '2025-05-10', 7),
('P060', 'CatGold Hairball Control', 'CatGold', 900, 'Thức ăn cho mèo', 'Mỹ', '2026-08-30', 40, 275000, 6, 4.7, 'Chất xơ tự nhiên, protein cá, omega 6', '2025-05-10', 1),
('P061', 'Snack mèo vị cá cơm', 'KittyJoy', 180, 'Bánh thưởng cho mèo', 'Hàn Quốc', '2026-11-20', 45, 69000, 5, 4.6, 'Cá cơm, taurine, vitamin A', '2025-05-10', 7),
('P062', 'Treats mèo vị gà phô mai', 'HappyCat', 200, 'Bánh thưởng cho mèo', 'Nhật Bản', '2026-12-10', 55, 88000, 5, 4.8, 'Thịt gà, phô mai, canxi', '2025-05-10', 7),
('P063', 'Snack que mềm cho mèo', 'MeoSnack', 120, 'Bánh thưởng cho mèo', 'Thái Lan', '2026-10-01', 60, 62000, 5, 4.7, 'Thịt cá, vitamin E, chất xơ', '2025-05-10', 7),
('P064', 'SmartDog Puppy Growth', 'SmartDog', 1000, 'Thức ăn cho chó', 'Đức', '2026-09-10', 50, 305000, 7, 4.8, 'Canxi, DHA, protein động vật', '2025-05-10', 1),
('P065', 'Bánh thưởng vị cá hồi cho chó', 'DogTreats', 250, 'Bánh thưởng cho chó', 'Canada', '2026-10-15', 40, 97000, 5, 4.9, 'Cá hồi, khoáng chất, omega 3', '2025-05-10', 7);

-- ─────────────────────────────────────────────────────────────────────────
-- Data SanPhamAnh (Product Images)
-- ─────────────────────────────────────────────────────────────────────────

-- Function to insert product images
CREATE OR REPLACE FUNCTION insert_product_image(
    p_ma_san_pham VARCHAR(50),
    p_image_url TEXT,
    p_public_id VARCHAR(255),
    p_format VARCHAR(20) DEFAULT NULL,
    p_is_main BOOLEAN DEFAULT FALSE
) RETURNS VOID AS $$
DECLARE
    v_san_pham_id INTEGER;
BEGIN
    -- Get product ID
    SELECT id INTO v_san_pham_id FROM SanPham WHERE ma_san_pham = p_ma_san_pham;
    
    IF v_san_pham_id IS NOT NULL THEN
        INSERT INTO SanPhamAnh (san_pham_id, image_url, public_id, format, is_main)
        VALUES (v_san_pham_id, p_image_url, p_public_id, p_format, p_is_main);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert product images
-- P001
SELECT insert_product_image('P001', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746512069/egapets/products/P001/qvhlg1xmnd6x5t0r0yck.jpg', 'egapets/products/P001/qvhlg1xmnd6x5t0r0yck', 'jpg', TRUE);
SELECT insert_product_image('P001', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538845/egapets/products/P001/qppkr0fowftpulwcw7n9.jpg', 'egapets/products/P001/qppkr0fowftpulwcw7n9', 'jpg');
SELECT insert_product_image('P001', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538846/egapets/products/P001/v4tyz3hekdnlx4w31oif.jpg', 'egapets/products/P001/v4tyz3hekdnlx4w31oif', 'jpg');

-- P010
SELECT insert_product_image('P010', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538848/egapets/products/P0010/ciewgaufpv3ecwnckbej.jpg', 'egapets/products/P010/ciewgaufpv3ecwnckbej', 'jpg', TRUE);
SELECT insert_product_image('P010', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538849/egapets/products/P0010/skooaxgtob5q0bemvkij.jpg', 'egapets/products/P010/skooaxgtob5q0bemvkij', 'jpg');
SELECT insert_product_image('P010', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538850/egapets/products/P0010/t8otfvdzslnbch2uwavi.jpg', 'egapets/products/P010/t8otfvdzslnbch2uwavi', 'jpg');

-- P011
SELECT insert_product_image('P011', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538852/egapets/products/P0011/g3gpsi2dgjwlklw6vvox.jpg', 'egapets/products/P011/g3gpsi2dgjwlklw6vvox', 'jpg', TRUE);
SELECT insert_product_image('P011', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538853/egapets/products/P0011/uaksen8wfsb4jjwy2gof.jpg', 'egapets/products/P011/uaksen8wfsb4jjwy2gof', 'jpg');

-- P012
SELECT insert_product_image('P012', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538854/egapets/products/P0012/qcy8inplayuuiw1g67bf.jpg', 'egapets/products/P012/qcy8inplayuuiw1g67bf', 'jpg', TRUE);
SELECT insert_product_image('P012', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538856/egapets/products/P0012/ewov2iuf2jfch4hdhtxp.jpg', 'egapets/products/P012/ewov2iuf2jfch4hdhtxp', 'jpg');
SELECT insert_product_image('P012', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538857/egapets/products/P0012/mfseqcextajlkajyaxhu.jpg', 'egapets/products/P012/mfseqcextajlkajyaxhu', 'jpg');

-- Continue with other product images...
-- (Adding a few more key products for demonstration)

-- P002
SELECT insert_product_image('P002', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538875/egapets/products/P002/gq9scdzu7j2iquywdtm2.jpg', 'egapets/products/P002/gq9scdzu7j2iquywdtm2', 'jpg', TRUE);
SELECT insert_product_image('P002', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538880/egapets/products/P002/x7ffq2hyvxcxsoog6jid.jpg', 'egapets/products/P002/x7ffq2hyvxcxsoog6jid', 'jpg');

-- P003
SELECT insert_product_image('P003', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538894/egapets/products/P003/pmwwnbcquc3racntfi6u.jpg', 'egapets/products/P003/pmwwnbcquc3racntfi6u', 'jpg', TRUE);
SELECT insert_product_image('P003', 'https://res.cloudinary.com/decwpls2n/image/upload/v1746538895/egapets/products/P003/v58c1smlatsxnpnmk8s9.jpg', 'egapets/products/P003/v58c1smlatsxnpnmk8s9', 'jpg');

-- ─────────────────────────────────────────────────────────────────────────
-- Data Users, KhachHang, NhanVien
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO Users (username, password_hash, role, email)
VALUES 
   ('adminAccount', digest('AdminPassword123', 'sha256'), 'Admin', 'admin@egapets.com'),
   ('employeeAccount', digest('EmployeePassword456', 'sha256'), 'NhanVien', 'employee@egapets.com'),
   ('customerAccount', digest('CustomerPassword789', 'sha256'), 'KhachHang', 'customer@egapets.com');

-- Create employee profile
DO $$
DECLARE
    nhan_vien_user_id INTEGER;
BEGIN
    SELECT id INTO nhan_vien_user_id FROM Users WHERE username = 'employeeAccount';
    
    INSERT INTO NhanVien (
        user_id, ho_ten, so_dien_thoai, ngay_sinh, dia_chi, chuc_vu, luong
    ) VALUES (
        nhan_vien_user_id,
        'Nguyễn Văn A',
        '0123456789',
        '1990-01-01',
        '123 Đường ABC, Hà Nội',
        'Nhân viên bán hàng',
        7000000
    );
END $$;

-- Create customer profile
DO $$
DECLARE
    khach_hang_user_id INTEGER;
BEGIN
    SELECT id INTO khach_hang_user_id FROM Users WHERE username = 'customerAccount';
    
    INSERT INTO KhachHang (
        user_id, ho_ten, so_dien_thoai, ngay_sinh, dia_chi, tinh_thanh, quan_huyen, phuong_xa
    ) VALUES (
        khach_hang_user_id,
        'Trần Thị B',
        '0987654321',
        '1995-05-10',
        'Số 456, Đường XYZ',
        'Hà Nội',
        'Đống Đa',
        'Láng Hạ'
    );
END $$;

-- ─────────────────────────────────────────────────────────────────────────
-- Data PhuongThucThanhToan
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO PhuongThucThanhToan (ten_phuong_thuc) VALUES
('Tiền mặt'),
('Chuyển khoản'),
('Thẻ tín dụng'),
('Ví điện tử'),
('QR Code');

-- ─────────────────────────────────────────────────────────────────────────
-- Data DichVu
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO DichVu (ten_dich_vu, mo_ta, gia_mac_dinh) VALUES
('Tắm rửa cho chó', 'Dịch vụ tắm sạch sẽ, khử mùi và dưỡng lông cho chó.', 100000),
('Tắm rửa cho mèo', 'Dịch vụ tắm dành riêng cho mèo, sử dụng dầu tắm chuyên dụng.', 120000),
('Cắt tỉa lông chó', 'Tạo kiểu, cắt lông theo yêu cầu cho thú cưng.', 150000),
('Cắt tỉa lông mèo', 'Tạo kiểu, cắt lông theo yêu cầu dành riêng cho mèo.', 130000),
('Vệ sinh tai', 'Vệ sinh sạch sẽ tai thú cưng, ngăn ngừa nhiễm trùng.', 50000),
('Cắt móng', 'Cắt móng an toàn, tránh thú cưng bị thương do móng dài.', 40000),
('Trọn gói spa chó', 'Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.', 250000),
('Trọn gói spa mèo', 'Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.', 230000);

-- ─────────────────────────────────────────────────────────────────────────
-- Data DichVuChiTiet
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO DichVuChiTiet (dich_vu_id, can_nang, loai_long, gia) VALUES
-- Tắm rửa cho chó
(1, '<3kg', 'Ngắn', 80000),
(1, '<3kg', 'Dài', 90000),
(1, '3-5kg', 'Ngắn', 100000),
(1, '3-5kg', 'Dài', 110000),
(1, '5-10kg', 'Ngắn', 120000),
(1, '5-10kg', 'Dài', 130000),
(1, '10-20kg', 'Ngắn', 150000),
(1, '10-20kg', 'Dài', 170000),
(1, '>20kg', 'Ngắn', 200000),
(1, '>20kg', 'Dài', 220000),

-- Tắm rửa cho mèo
(2, '<3kg', 'Ngắn', 100000),
(2, '<3kg', 'Dài', 110000),
(2, '3-5kg', 'Ngắn', 120000),
(2, '3-5kg', 'Dài', 130000),
(2, '5-10kg', 'Ngắn', 140000),
(2, '5-10kg', 'Dài', 150000),

-- Cắt tỉa lông chó
(3, '<3kg', 'Ngắn', 120000),
(3, '<3kg', 'Dài', 130000),
(3, '3-5kg', 'Ngắn', 140000),
(3, '3-5kg', 'Dài', 150000),
(3, '5-10kg', 'Ngắn', 160000),
(3, '5-10kg', 'Dài', 170000),

-- Cắt tỉa lông mèo
(4, '<3kg', 'Ngắn', 110000),
(4, '<3kg', 'Dài', 120000),
(4, '3-5kg', 'Ngắn', 130000),
(4, '3-5kg', 'Dài', 140000),

-- Vệ sinh tai
(5, '<3kg', 'Ngắn', 50000),
(5, '<3kg', 'Dài', 50000),
(5, '3-5kg', 'Ngắn', 60000),
(5, '3-5kg', 'Dài', 60000),

-- Cắt móng
(6, '<3kg', 'Ngắn', 40000),
(6, '<3kg', 'Dài', 40000),
(6, '3-5kg', 'Ngắn', 50000),
(6, '3-5kg', 'Dài', 50000);

-- Drop the helper function
DROP FUNCTION IF EXISTS insert_product_image(VARCHAR, TEXT, VARCHAR, VARCHAR, BOOLEAN);

PRINT 'PostgreSQL data import completed successfully!';