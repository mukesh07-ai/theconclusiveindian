"""add_ads_redirects_and_cms_fields

Revision ID: e57b98f24a10
Revises: cdf013a0af80
Create Date: 2026-11-10 10:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'e57b98f24a10'
down_revision: Union[str, Sequence[str], None] = 'cdf013a0af80'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. User Security & Password Management Extensions
    op.add_column('users', sa.Column('must_change_password', sa.Boolean(), server_default=sa.text('0'), nullable=False))
    op.add_column('users', sa.Column('failed_login_attempts', sa.Integer(), server_default=sa.text('0'), nullable=False))
    op.add_column('users', sa.Column('locked_until', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('permissions_json', sa.Text(), nullable=True))
    op.add_column('users', sa.Column('last_login_at', sa.DateTime(), nullable=True))

    # 2. Article Editorial & SEO Extensions
    op.add_column('articles', sa.Column('editorial_notes', sa.Text(), nullable=True))
    op.add_column('articles', sa.Column('approved_by', sa.String(length=36), nullable=True))
    op.add_column('articles', sa.Column('approved_at', sa.DateTime(), nullable=True))
    op.add_column('articles', sa.Column('submitted_at', sa.DateTime(), nullable=True))
    op.add_column('articles', sa.Column('seo_title', sa.String(length=500), nullable=True))
    op.add_column('articles', sa.Column('meta_description', sa.Text(), nullable=True))
    op.add_column('articles', sa.Column('focus_keyword', sa.String(length=255), nullable=True))
    op.add_column('articles', sa.Column('canonical_url', sa.String(length=1000), nullable=True))
    op.add_column('articles', sa.Column('og_image', sa.String(length=1000), nullable=True))
    op.add_column('articles', sa.Column('no_index', sa.Boolean(), server_default=sa.text('0'), nullable=False))

    # 3. Create Advertisements Table
    op.create_table(
        'advertisements',
        sa.Column('id', sa.String(length=50), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('advertiser_name', sa.String(length=255), nullable=False),
        sa.Column('destination_url', sa.String(length=1000), nullable=False),
        sa.Column('creative_desktop_url', sa.String(length=1000), nullable=False),
        sa.Column('creative_mobile_url', sa.String(length=1000), nullable=True),
        sa.Column('placement_positions', sa.String(length=500), nullable=False),
        sa.Column('ad_type', sa.String(length=50), server_default='image_banner', nullable=False),
        sa.Column('start_date', sa.DateTime(), nullable=True),
        sa.Column('end_date', sa.DateTime(), nullable=True),
        sa.Column('priority', sa.Integer(), server_default=sa.text('1'), nullable=False),
        sa.Column('is_active', sa.Boolean(), server_default=sa.text('1'), nullable=False),
        sa.Column('impressions_count', sa.Integer(), server_default=sa.text('0'), nullable=False),
        sa.Column('clicks_count', sa.Integer(), server_default=sa.text('0'), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_advertisements_is_active'), 'advertisements', ['is_active'], unique=False)

    # 4. Create URL Redirects Table
    op.create_table(
        'url_redirects',
        sa.Column('id', sa.String(length=50), nullable=False),
        sa.Column('source_path', sa.String(length=500), nullable=False),
        sa.Column('target_path', sa.String(length=500), nullable=False),
        sa.Column('status_code', sa.Integer(), server_default=sa.text('301'), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_url_redirects_source_path'), 'url_redirects', ['source_path'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_url_redirects_source_path'), table_name='url_redirects')
    op.drop_table('url_redirects')
    op.drop_index(op.f('ix_advertisements_is_active'), table_name='advertisements')
    op.drop_table('advertisements')

    op.drop_column('articles', 'no_index')
    op.drop_column('articles', 'og_image')
    op.drop_column('articles', 'canonical_url')
    op.drop_column('articles', 'focus_keyword')
    op.drop_column('articles', 'meta_description')
    op.drop_column('articles', 'seo_title')
    op.drop_column('articles', 'submitted_at')
    op.drop_column('articles', 'approved_at')
    op.drop_column('articles', 'approved_by')
    op.drop_column('articles', 'editorial_notes')

    op.drop_column('users', 'last_login_at')
    op.drop_column('users', 'permissions_json')
    op.drop_column('users', 'locked_until')
    op.drop_column('users', 'failed_login_attempts')
    op.drop_column('users', 'must_change_password')
