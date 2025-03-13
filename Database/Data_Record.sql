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
INSERT INTO SanPham (ma_san_pham, ten_san_pham, thuong_hieu, so_gram, loai, nguon_goc, han_su_dung, so_luong, gia_thanh, giam_gia, danh_gia, thanh_phan, ngay_tao, danh_muc_id)
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
(N'P050', N'Bột tắm khô', N'DryBath', 400, N'Tắm khô', N'Pháp', '2026-09-15', 40, 220000, 0, 4.8, N'Chiết xuất thiên nhiên', GETDATE(), 10);
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
