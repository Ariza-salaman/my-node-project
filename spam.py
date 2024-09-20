import hashlib
import os
print(os.getcwd())


def get_md5(input_string):
    md5_hash = hashlib.md5()
    md5_hash.update(input_string.encode('utf-8'))
    return md5_hash.hexdigest()

print(get_md5("8b7a34df55da4d00b5e72f0d95e155fc"))

def get_file_md5(file_path):
    md5_hash = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            md5_hash.update(chunk)
    return md5_hash.hexdigest()

# 示例使用
# file_md5 = get_file_md5("example.txt")
# print(file_md5)